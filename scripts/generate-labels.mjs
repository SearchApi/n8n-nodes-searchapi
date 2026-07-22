import { writeFileSync } from 'node:fs';
import { allHelperCalls, allLists, KIND_BY_FIELD } from './lib-extract.mjs';
import { isSentinel, normalize, resolve } from './lib-labels.mjs';
import { SENTINEL_LABELS } from './overrides.mjs';
import { existingLabels, railsLocaleLabels } from './lib-locales.mjs';

const OUT = 'nodes/SearchApi/shared/labels.ts';

function collect() {
  const byKind = { country: new Set(), language: new Set(), currency: new Set() };
  for (const list of allLists()) {
    const kind = KIND_BY_FIELD[list.field];
    if (!kind || !(kind in byKind)) continue;
    for (const entry of list.entries) byKind[kind].add(normalize(kind, entry.value));
  }
  for (const call of allHelperCalls()) {
    if (!(call.kind in byKind)) continue;
    for (const value of call.values) byKind[call.kind].add(normalize(call.kind, value));
  }
  return byKind;
}

function emit(name, kind, codes) {
  const lines = [];
  const unresolved = [];
  for (const code of [...codes].sort()) {
    const label = resolve(kind, code);
    if (label === null) {
      unresolved.push(code);
      continue;
    }
    lines.push(`  '${code}': '${label.replace(/'/g, "\\'")}',`);
  }
  return { block: `export const ${name}: Record<string, string> = {\n${lines.join('\n')}\n};`, unresolved };
}

const collected = collect();
const blocks = [];
let failed = false;
for (const [kind, name] of [
  ['country', 'COUNTRY_LABELS'],
  ['language', 'LANGUAGE_LABELS'],
  ['currency', 'CURRENCY_LABELS'],
]) {
  const codes = [...collected[kind]].filter((c) => !isSentinel(kind, c));
  const { block, unresolved } = emit(name, kind, codes);
  if (unresolved.length) {
    failed = true;
    console.error(`unresolved ${kind} codes (add to scripts/overrides.mjs): ${unresolved.join(', ')}`);
  }
  blocks.push(block);
}

const locales = railsLocaleLabels() ?? existingLabels(OUT, 'LOCALE_LABELS');
if (!locales) {
  console.error('no locale source: set RAILS_DUCKDUCKGO_CONSTANTS to a searchapi.io checkout');
  failed = true;
} else {
  const rows = Object.keys(locales)
    .sort()
    .map((code) => `  '${code}': '${locales[code].replace(/'/g, "\\'")}',`)
    .join('\n');
  blocks.push(`export const LOCALE_LABELS: Record<string, string> = {\n${rows}\n};`);
}

const sentinels = Object.entries(SENTINEL_LABELS)
  .map(([k, v]) => `  '${k}': '${v}',`)
  .join('\n');
blocks.unshift(`export const SENTINEL_LABELS: Record<string, string> = {\n${sentinels}\n};`);

writeFileSync(OUT, `${blocks.join('\n\n')}\n`);
console.log(`wrote ${OUT}`);
if (failed) process.exit(1);
