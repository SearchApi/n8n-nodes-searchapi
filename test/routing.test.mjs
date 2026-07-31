import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function loadDescription() {
	const modulePath = join(ROOT, 'dist/nodes/SearchApi/SearchApi.node.js');
	try {
		const { SearchApi } = require(modulePath);
		return new SearchApi().description;
	} catch {
		throw new Error(`Cannot load ${modulePath}; run "npm run build" first.`);
	}
}

const description = loadDescription();
const resource = description.properties.find((property) => property.name === 'resource');
const operation = description.properties.find((property) => property.name === 'operation');

test('the Search operation routes the selected resource as engine', () => {
	assert.ok(resource?.options?.length, 'the node must expose at least one engine');

	const search = operation?.options?.find((option) => option.value === 'search');
	const query = search?.routing?.request?.qs;

	assert.deepEqual(Object.keys(query ?? {}), ['engine']);
	assert.match(String(query.engine), /\$parameter\["resource"\]/);
});

for (const { name: displayName, value: engine } of resource?.options ?? []) {
	test(`${displayName} parameters route to matching query-string keys`, () => {
		const owned = description.properties.filter(
			(property) =>
				property.type !== 'notice' && property.displayOptions?.show?.resource?.includes(engine),
		);

		assert.ok(owned.length > 0, `${engine}: no parameters found`);

		for (const property of owned) {
			const fields = property.type === 'collection' ? property.options : [property];
			for (const field of fields) {
				const location =
					property.type === 'collection'
						? `${engine}.${property.name}.${field.name}`
						: `${engine}.${field.name}`;
				const query = field.routing?.request?.qs;
				const keys = Object.keys(query ?? {});

				assert.deepEqual(keys, [field.name], `${location}: expected one matching query-string key`);
				assert.match(
					String(query[field.name]),
					/\$value/,
					`${location}: route must forward $value`,
				);
			}
		}
	});
}

// A property with no resource in displayOptions is shown for every engine, so its parameter would
// be sent on every search.
test('every parameter is scoped to exactly one engine', () => {
	const known = new Set(resource.options.map((option) => option.value));

	for (const property of description.properties) {
		if (property.name === 'resource' || property.name === 'operation') continue;

		const shown = property.displayOptions?.show?.resource;
		assert.ok(shown, `${property.name}: no displayOptions, so it is sent for every engine`);
		assert.equal(shown.length, 1, `${property.name}: shown for ${shown.length} engines`);
		assert.ok(known.has(shown[0]), `${property.name}: unknown engine ${shown[0]}`);
	}
});

// The same name twice in one engine would build the same query-string key from two inputs.
test('no engine declares the same parameter twice', () => {
	for (const { value: engine } of resource.options) {
		const seen = new Map();

		for (const property of description.properties) {
			if (property.type === 'notice' || !property.displayOptions?.show?.resource?.includes(engine)) continue;
			for (const field of property.type === 'collection' ? property.options : [property]) {
				const owner = property.type === 'collection' ? property.name : 'top level';
				assert.ok(
					!seen.has(field.name),
					`${engine}.${field.name}: declared in both ${seen.get(field.name)} and ${owner}`,
				);
				seen.set(field.name, owner);
			}
		}
	}
});
