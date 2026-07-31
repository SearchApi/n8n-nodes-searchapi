import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import cases from '../test/smoke/cases.mjs';

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, '.n8n-e2e/searchapi-smoke.workflow.json');
const CREDENTIAL_ID = process.env.SEARCHAPI_CREDENTIAL_ID;
const CREDENTIAL_NAME = process.env.SEARCHAPI_CREDENTIAL_NAME || 'SearchApi account';
const NODE_TYPE = 'CUSTOM.searchApi';
const WORKFLOW_ID = 'searchapi-smoke';

if (!CREDENTIAL_ID) {
	console.error('SEARCHAPI_CREDENTIAL_ID is required.');
	process.exit(1);
}

function loadEngines() {
	const modulePath = join(ROOT, 'dist/nodes/SearchApi/SearchApi.node.js');
	try {
		const { SearchApi } = require(modulePath);
		const description = new SearchApi().description;
		const resources = description.properties.find(
			(property) => property.name === 'resource',
		).options;

		return resources.map(({ name: displayName, value: engine }) => {
			const parameters = new Map();
			const owned = description.properties.filter(
				(property) =>
					property.type !== 'notice' && property.displayOptions?.show?.resource?.includes(engine),
			);
			for (const property of owned) {
				for (const field of property.type === 'collection' ? property.options : [property]) {
					parameters.set(field.name, property.type === 'collection' ? property.name : null);
				}
			}
			return { engine, displayName, parameters };
		});
	} catch {
		console.error(`Cannot load ${modulePath}; run "npm run build" first.`);
		process.exit(1);
	}
}

const isExpression = (value) =>
	typeof value === 'object' && value !== null && !Array.isArray(value) && 'expression' in value;
const isReference = (value) =>
	typeof value === 'object' && value !== null && !Array.isArray(value) && 'from' in value;

// An engine is either a single parameter set or a list of named ones, so that a single engine
// can be exercised with several parameter combinations. References always point at the base
// case, which carries the fewest filters and so is the one most likely to return results.
const casesFor = (engine) =>
	Array.isArray(cases[engine])
		? cases[engine].map((entry, index) => ({ name: index === 0 ? 'base' : entry.name, params: entry.params }))
		: [{ name: 'base', params: cases[engine] ?? {} }];
const nodeName = (engine, caseName = 'base') =>
	caseName === 'base' ? `Smoke · ${engine}` : `Smoke · ${engine} · ${caseName}`;

function referenceExpression(reference) {
	if (reference.path) {
		return `={{ $('${nodeName(reference.from)}').first().json.${reference.path} }}`;
	}

	return (
		`={{ (() => { const skip = ['search_parameters', 'search_metadata', 'search_information']; ` +
		`const queue = [$('${nodeName(reference.from)}').first().json]; while (queue.length) { ` +
		`const item = queue.shift(); if (!item || typeof item !== 'object') continue; ` +
		`for (const [key, value] of Object.entries(item)) { if (skip.includes(key)) continue; ` +
		`if (key === '${reference.key}' && value !== null && value !== undefined && typeof value !== 'object') return value; ` +
		`if (value && typeof value === 'object') queue.push(value); } } return ''; })() }}`
	);
}

function validate(engines) {
	const knownEngines = new Set(engines.map(({ engine }) => engine));
	const problems = [];

	for (const engine of knownEngines) {
		if (!(engine in cases)) problems.push(`${engine}: no smoke case`);
	}
	for (const engine of Object.keys(cases)) {
		if (!knownEngines.has(engine)) problems.push(`${engine}: not a known engine`);
	}

	for (const { engine, parameters } of engines) {
		const seen = new Set();
		for (const { name: caseName, params } of casesFor(engine)) {
			if (seen.has(caseName)) problems.push(`${engine}: duplicate case '${caseName}'`);
			seen.add(caseName);
			for (const [name, value] of Object.entries(params ?? {})) {
				if (!parameters.has(name)) problems.push(`${engine}.${caseName}.${name}: unknown parameter`);
				if (!isReference(value)) continue;
				if (!knownEngines.has(value.from)) {
					problems.push(`${engine}.${caseName}.${name}: references unknown engine '${value.from}'`);
				}
				if ((!value.path && !value.key) || (value.path && value.key)) {
					problems.push(`${engine}.${caseName}.${name}: reference must declare exactly one of path or key`);
				}
			}
		}
	}

	if (problems.length) {
		for (const problem of problems) console.error(`error ${problem}`);
		console.error(`\n${problems.length} smoke configuration problem(s).`);
		process.exit(1);
	}
}

function orderEngines(engines) {
	const byName = new Map(engines.map((engine) => [engine.engine, engine]));
	const dependencies = new Map(
		engines.map(({ engine }) => [
			engine,
			new Set(
				casesFor(engine)
					.flatMap(({ params }) => Object.values(params ?? {}))
					.filter(isReference)
					.map((reference) => reference.from)
					// A case may chain off its own engine's base node, which always runs first.
					.filter((dependency) => dependency !== engine),
			),
		]),
	);
	const ordered = [];
	const remaining = new Set(byName.keys());

	while (remaining.size) {
		const ready = [...remaining].find((engine) =>
			[...dependencies.get(engine)].every((dependency) => !remaining.has(dependency)),
		);
		if (!ready) {
			console.error(`Circular smoke dependencies: ${[...remaining].join(', ')}`);
			process.exit(1);
		}
		ordered.push(byName.get(ready));
		remaining.delete(ready);
	}
	return ordered;
}

function uuidFrom(seed) {
	const hex = createHash('md5').update(seed).digest('hex');
	return [
		hex.slice(0, 8),
		hex.slice(8, 12),
		hex.slice(12, 16),
		hex.slice(16, 20),
		hex.slice(20, 32),
	].join('-');
}

function buildNode({ engine, parameters }, { name: caseName, params }, index) {
	const configured = { resource: engine, operation: 'search' };

	for (const [name, rawValue] of Object.entries(params ?? {})) {
		const collection = parameters.get(name);
		const value = isReference(rawValue)
			? referenceExpression(rawValue)
			: isExpression(rawValue)
				? `=${rawValue.expression}`
				: rawValue;

		if (collection) {
			configured[collection] ??= {};
			configured[collection][name] = value;
		} else {
			configured[name] = value;
		}
	}

	return {
		parameters: configured,
		type: NODE_TYPE,
		typeVersion: 1,
		position: [260 + index * 300, 0],
		id: uuidFrom(nodeName(engine, caseName)),
		name: nodeName(engine, caseName),
		credentials: {
			searchApi: { id: CREDENTIAL_ID, name: CREDENTIAL_NAME },
		},
		alwaysOutputData: true,
		onError: 'continueRegularOutput',
		retryOnFail: true,
		maxTries: 3,
		waitBetweenTries: 2000,
	};
}

const engines = loadEngines();
validate(engines);
const ordered = orderEngines(engines);
const trigger = {
	parameters: {},
	type: 'n8n-nodes-base.manualTrigger',
	typeVersion: 1,
	position: [-60, 0],
	id: uuidFrom('smoke-trigger'),
	name: 'Run smoke',
};
let index = 0;
const nodes = ordered.flatMap((entry) =>
	casesFor(entry.engine).map((testCase) => buildNode(entry, testCase, index++)),
);
const chain = [trigger, ...nodes];
const connections = {};

for (let index = 0; index < chain.length - 1; index++) {
	connections[chain[index].name] = {
		main: [[{ node: chain[index + 1].name, type: 'main', index: 0 }]],
	};
}

const workflow = {
	id: WORKFLOW_ID,
	name: 'SearchApi all-engine smoke',
	nodes: chain,
	connections,
	active: false,
	settings: { executionOrder: 'v1' },
	pinData: {},
	versionId: uuidFrom(ordered.map(({ engine }) => engine).join(',')),
	meta: { instanceId: 'searchapi-smoke' },
	tags: [],
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, `${JSON.stringify(workflow, null, 2)}\n`);
console.log(`wrote ${OUT}`);
console.log(`${ordered.length} engines, ${nodes.length} parameter combinations`);
