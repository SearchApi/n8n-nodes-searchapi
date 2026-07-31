// Compares every engine against the searchapi.io Rails models, which decide what the API really
// accepts:
//
//   permitted_params            the allowlist SearchProcessor filters requests through — anything
//                               outside it is dropped before the search is built
//   validates … inclusion:      the values a parameter accepts
//   validates … presence:       whether a parameter is required, and whether that is conditional
//
// Constants are read by loading the constant files in Ruby rather than parsing them, so the value
// lists are exactly what the API validates against.
//
//   SEARCHAPI_DIR=../searchapi.io npm run check:engines
//
// Without that checkout the check skips, so it never blocks a build that cannot run it.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RAILS = resolve(ROOT, process.env.SEARCHAPI_DIR ?? '../searchapi.io');
const STRICT = process.argv.includes('--strict');

if (!existsSync(join(RAILS, 'app/models/searches'))) {
	console.log(`no searchapi.io checkout at ${RAILS} — skipping engine check`);
	process.exit(0);
}

const constants = loadConstants();
const description = loadDescription();
const engines = description.properties
	.find((property) => property.name === 'resource')
	.options.map((option) => option.value);

const constantName = (reference) => reference.replace(/\.(keys|values)$/, '');
const list = (values) => `${values.slice(0, 8).map((value) => `'${value}'`).join(', ')}${values.length > 8 ? ` and ${values.length - 8} more` : ''}`;

const problems = [];
const notes = [];

for (const engine of engines) {
	const model = readModel(engine);
	if (!model) {
		problems.push(`${engine}: no model at app/models/searches/${engine}.rb`);
		continue;
	}

	const exposed = nodeParams(engine);

	for (const [name, field] of exposed) {
		if (!model.accepted.has(name)) {
			problems.push(`${engine}.${name}: not in permitted_params — the API drops it`);
			continue;
		}

		const reference = model.enums.get(name) ?? model.customEnums.get(name);
		const accepted = reference ? constants[constantName(reference)] : null;
		if (field.options && accepted) {
			const allowed = new Set(accepted.map((value) => value.toLowerCase()));
			const rejected = field.options.filter((value) => value !== '' && !allowed.has(value.toLowerCase()));
			const missing = accepted.filter(
				(value) => value !== '' && !field.options.some((option) => option.toLowerCase() === value.toLowerCase()),
			);
			if (rejected.length) problems.push(`${engine}.${name}: offers ${list(rejected)} which ${reference} rejects`);
			if (missing.length) problems.push(`${engine}.${name}: ${reference} accepts ${list(missing)} which is not offered`);
		}

		const bound = model.bounds.get(name);
		if (bound && field.type === 'number') {
			if (bound.max !== undefined && field.max !== bound.max) {
				problems.push(`${engine}.${name}: the model caps it at ${bound.max} but the node allows ${field.max ?? 'any value'}`);
			}
			if (bound.min !== undefined && field.min !== bound.min) {
				problems.push(`${engine}.${name}: the model floors it at ${bound.min} but the node allows ${field.min ?? 'any value'}`);
			}
		}

		if (model.required.has(name) && !field.required && !model.derived) {
			problems.push(`${engine}.${name}: always required by the model but optional on the node`);
		}
		if (field.required && !model.required.has(name) && !model.conditionallyRequired.has(name)) {
			problems.push(`${engine}.${name}: required on the node but never required by the model`);
		}
	}

	for (const name of model.accepted) {
		if (name === 'zero_retention') continue;
		if (!exposed.has(name)) problems.push(`${engine}.${name}: accepted by the API but not exposed`);
	}

	for (const [name, reference] of model.conditionalEnums) {
		if (exposed.has(name)) notes.push(`${engine}.${name}: also validated against ${reference} in some cases`);
	}
}

for (const note of notes) console.log(`note  ${note}`);
for (const problem of problems) console.error(`error ${problem}`);

if (problems.length) {
	console.error(`\n${problems.length} engine divergence(s) from searchapi.io.`);
	process.exit(1);
}
console.log(`\n${engines.length} engines match searchapi.io${notes.length ? ` (${notes.length} conditional rule(s))` : ''}`);
if (STRICT && notes.length) process.exit(1);

// ── loading ───────────────────────────────────────────────────────────────────

function loadDescription() {
	const modulePath = join(ROOT, 'dist/nodes/SearchApi/SearchApi.node.js');
	try {
		const { SearchApi } = require(modulePath);
		return new SearchApi().description;
	} catch {
		console.error(`Cannot load ${modulePath}; run "npm run build" first.`);
		process.exit(1);
	}
}

function nodeParams(engine) {
	const params = new Map();
	for (const property of description.properties) {
		if (property.type === 'notice' || !property.displayOptions?.show?.resource?.includes(engine)) continue;
		for (const field of property.type === 'collection' ? property.options : [property]) {
			params.set(field.name, {
				required: field.required === true,
				type: field.type,
				min: field.typeOptions?.minValue,
				max: field.typeOptions?.maxValue,
				options:
					field.type === 'options' || field.type === 'multiOptions'
						? field.options.map((option) => String(option.value))
						: null,
			});
		}
	}
	return params;
}

// Ruby loads the constant files themselves; they reference each other, so keep re-trying until a
// pass loads nothing new.
function loadConstants() {
	const script = `
		require 'json'
		module Constants; end
		pending = Dir.glob("#{ARGV[0]}/app/lib/constants/**/*.rb").sort
		loop do
			failed = pending.reject { |file| (require file rescue false) }
			break if failed.size == pending.size
			pending = failed
			break if pending.empty?
		end
		out = {}
		walk = lambda do |mod, prefix|
			mod.constants(false).each do |const|
				value = (mod.const_get(const) rescue next)
				name = "#{prefix}::#{const}"
				case value
				when Module then walk.call(value, name)
				when Hash then out[name] = value.keys.map(&:to_s)
				when Array then out[name] = value.map(&:to_s)
				end
			end
		end
		walk.call(Constants, 'Constants')
		puts JSON.generate(out)
	`;
	try {
		return JSON.parse(execFileSync('ruby', ['-e', script, RAILS], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 }));
	} catch {
		console.error('Could not read the searchapi.io constants with ruby.');
		process.exit(1);
	}
}

function readModel(engine) {
	const path = join(RAILS, 'app/models/searches', `${engine}.rb`);
	if (!existsSync(path)) return null;
	let source = readFileSync(path, 'utf8');

	const parent = /^class\s+Searches::\w+\s*<\s*Searches::(\w+)/m.exec(source)?.[1];
	if (parent) {
		const parentPath = join(
			RAILS,
			'app/models/searches',
			`${parent.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase()}.rb`,
		);
		if (existsSync(parentPath)) source = `${readFileSync(parentPath, 'utf8')}\n${source}`;
	}

	const listed = /def self\.permitted_params\s*\n\s*%i\[([^\]]*)\]/.exec(source)?.[1] ?? '';
	const accepted = new Set(listed.split(/\s+/).filter(Boolean));
	// zero_retention is read off the request context rather than permitted_params.
	accepted.add('zero_retention');

	const required = new Set();
	const conditionallyRequired = new Set();
	for (const match of source.matchAll(
		/^\s*validates\s+:(\w+),([\s\S]*?)(?=\n\s*(?:validates?\s|def\s|before_validation|end\s*$))/gm,
	)) {
		if (!/presence:/.test(match[2])) continue;
		(/\b(if|unless):/.test(match[2]) ? conditionallyRequired : required).add(match[1]);
	}

	const enums = new Map();
	const conditionalEnums = new Map();
	for (const match of source.matchAll(
		/validates\s+:(\w+),\s*inclusion:\s*\{\s*in:\s*(Constants::[\w:]+(?:\.keys|\.values)?)[\s\S]*?$/gm,
	)) {
		(/\b(if|unless):/.test(match[0]) ? conditionalEnums : enums).set(match[1], match[2]);
	}

	// Custom validators hold value lists the inclusion rules never mention.
	const customEnums = new Map();
	for (const match of source.matchAll(/validate\s+:(\w+)\b/g)) {
		const body = new RegExp(`def ${match[1]}\\b([\\s\\S]*?)\\n  end`).exec(source)?.[1];
		if (!body) continue;
		const reference = /(Constants::[\w:]+)(\.keys|\.values)?/.exec(body)?.[0];
		if (!reference) continue;
		const target = /errors\.add\(:(\w+)/.exec(body)?.[1] ?? match[1].replace(/_validation$/, '');
		// A validator that branches over several lists describes a conditional rule, not one list.
		const branching = (body.match(/Constants::/g) ?? []).length > 1;
		if (!target || target === 'base') continue;
		(branching ? conditionalEnums : customEnums).set(target, reference);
	}

	// Numeric ranges are part of the contract too: a validated range is rejected outright, and a
	// silent clamp like [value, DEFAULT_NUM].min quietly returns something else than asked for.
	const bounds = new Map();
	for (const match of source.matchAll(/^\s*validates\s+:(\w+),\s*numericality:\s*\{([^}]*)\}/gm)) {
		const bound = bounds.get(match[1]) ?? {};
		const min = /greater_than_or_equal_to:\s*(-?\d+)/.exec(match[2]);
		const max = /less_than_or_equal_to:\s*(-?\d+)/.exec(match[2]);
		if (min) bound.min = Math.max(bound.min ?? -Infinity, Number(min[1]));
		if (max) bound.max = Math.min(bound.max ?? Infinity, Number(max[1]));
		bounds.set(match[1], bound);
	}
	for (const match of source.matchAll(/def (\w+)\s*\n\s*super[^\n]*\[super\.to_i,\s*(\w+|\d+)\]\.min/g)) {
		const cap = /^\d+$/.test(match[2])
			? Number(match[2])
			: Number(new RegExp(`${match[2]}\\s*=\\s*(\\d+)`).exec(source)?.[1]);
		if (Number.isFinite(cap)) bounds.set(match[1], { ...(bounds.get(match[1]) ?? {}), max: cap });
	}

	return {
		accepted,
		required,
		bounds,
		conditionallyRequired,
		enums,
		conditionalEnums,
		customEnums,
		derived: /before_validation/.test(source),
	};
}
