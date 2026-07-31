import { readFileSync } from 'node:fs';

import cases from '../test/smoke/cases.mjs';

const casesFor = (engine) =>
	Array.isArray(cases[engine])
		? cases[engine].map((entry, index) => ({ name: index === 0 ? 'base' : entry.name, params: entry.params }))
		: [{ name: 'base', params: cases[engine] ?? {} }];
const nodeName = (engine, caseName) =>
	caseName === 'base' ? `Smoke · ${engine}` : `Smoke · ${engine} · ${caseName}`;
// Values resolved at run time cannot be compared against a fixed expectation.
const isDynamic = (value) =>
	typeof value === 'object' && value !== null && !Array.isArray(value) && ('from' in value || 'expression' in value);

const execution = parseExecution(readFileSync(0, 'utf8'));
const resultData = execution?.data?.resultData;
const runData = resultData?.runData;

if (resultData?.error) {
	console.error(
		`workflow execution failed: ${formatReason(resultData.error.message ?? resultData.error)}`,
	);
	process.exit(1);
}

if (!runData || typeof runData !== 'object') {
	console.error('execution output has no run data');
	process.exit(1);
}

let passed = 0;
let failed = 0;

for (const engine of Object.keys(cases)) {
	for (const { name: caseName, params } of casesFor(engine)) {
		const label = caseName === 'base' ? engine : `${engine} · ${caseName}`;
		const run = runData[nodeName(engine, caseName)]?.[0];
		const json = run?.data?.main?.[0]?.[0]?.json;
		const echoed = json?.search_parameters;

		// A rejected request answers with an error and nothing else. A response that echoes its
		// parameters back was accepted, even when the engine found no results for them.
		if (!echoed) {
			const reason =
				json?.error ?? run?.error?.message ?? 'node did not return search_parameters';
			console.log(`FAIL  ${label} — ${formatReason(reason)}`);
			failed++;
			continue;
		}

		const problems = [];
		if (echoed.engine !== engine) problems.push(`echoed engine ${JSON.stringify(echoed.engine)}`);

		for (const [param, value] of Object.entries(params ?? {})) {
			if (isDynamic(value)) continue;
			if (!(param in echoed)) continue; // the echo is a curated list, not every accepted param
			const sent = Array.isArray(value) ? JSON.stringify(value) : String(value);
			if (String(echoed[param]) !== sent) {
				problems.push(`${param} echoed as ${JSON.stringify(echoed[param])}, sent ${JSON.stringify(sent)}`);
			}
		}

		if (problems.length) {
			console.log(`FAIL  ${label} — ${problems.map(formatReason).join('; ')}`);
			failed++;
		} else {
			const note = json.error ? ` (${formatReason(json.error).slice(0, 60)})` : '';
			console.log(`ok    ${label} — ${Object.keys(params ?? {}).length} params${note}`);
			passed++;
		}
	}
}

console.log(`\n${passed + failed} combinations attempted: ${passed} ok, ${failed} failed`);

// This is a local diagnostic. Individual engine failures are reported but do not gate work.
process.exit(0);

function formatReason(reason) {
	const value = typeof reason === 'string' ? reason : JSON.stringify(reason);
	return value.replace(/\s+/g, ' ').trim();
}

function parseExecution(stdout) {
	if (!stdout.trim()) {
		console.error('no execution output on stdin; did n8n execute run with --rawOutput?');
		process.exit(1);
	}

	const start = stdout.indexOf('\n{\n');
	const body = start === -1 ? stdout.slice(stdout.indexOf('{')) : stdout.slice(start + 1);
	try {
		return JSON.parse(body.slice(0, body.lastIndexOf('}') + 1));
	} catch {
		console.error(`could not parse execution output:\n${stdout.slice(-2000)}`);
		process.exit(1);
	}
}
