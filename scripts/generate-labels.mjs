import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { COUNTRY_OVERRIDES, LANGUAGE_OVERRIDES, SENTINEL_LABELS } from './overrides.mjs';

const ENGINES_DIR = 'nodes/SearchApi/engines';
const SHARED_LISTS_FILE = 'nodes/SearchApi/shared/lists.ts';
const OUTPUT_FILE = 'nodes/SearchApi/shared/labels.ts';

const KIND_BY_FIELD_NAME = {
  gl: 'country',
  cr: 'country',
  country: 'country',
  region: 'country',
  country_code: 'country',
  hl: 'language',
  lr: 'language',
  language: 'language',
  lang: 'language',
  content_languages: 'language',
  currency: 'currency',
};

const KIND_BY_HELPER_NAME = {
  countryOptions: 'country',
  languageOptions: 'language',
  currencyOptions: 'currency',
};

const OPTIONS_LIST_PATTERN = /name: '(\w+)',\n\s*type: 'options',\n\s*options: \[\n([\s\S]*?)\n\s*\],/g;
const OPTION_VALUE_PATTERN = /\{ name: '(?:[^'\\]|\\.)*', value: '((?:[^'\\]|\\.)*)' \}/g;
const HELPER_CALL_PATTERN = /options: (countryOptions|languageOptions|currencyOptions)\((\[[\s\S]*?\]|[A-Z][A-Z0-9_]*)\)/g;

const DISPLAY_NAMES = {
  country: new Intl.DisplayNames(['en'], { type: 'region' }),
  language: new Intl.DisplayNames(['en'], { type: 'language' }),
  currency: new Intl.DisplayNames(['en'], { type: 'currency' }),
};

const UPPERCASE_KINDS = new Set(['country', 'currency']);

const OVERRIDES_BY_KIND = {
  country: COUNTRY_OVERRIDES,
  language: LANGUAGE_OVERRIDES,
  currency: {},
};

function engineSources() {
  return readdirSync(ENGINES_DIR)
    .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
    .sort()
    .map((file) => readFileSync(join(ENGINES_DIR, file), 'utf8'));
}

function parseQuotedStrings(text) {
  return [...text.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((match) => match[1].replace(/\\'/g, "'"));
}

function loadSharedLists() {
  const lists = {};
  const source = readFileSync(SHARED_LISTS_FILE, 'utf8');
  for (const match of source.matchAll(/export const ([A-Z][A-Z0-9_]*) = \[([\s\S]*?)\];/g)) {
    lists[match[1]] = parseQuotedStrings(match[2]);
  }
  return lists;
}

function helperCallValues(argument, sharedLists) {
  if (argument.startsWith('[')) return parseQuotedStrings(argument);
  const values = sharedLists[argument];
  if (!values) {
    throw new Error(`unknown shared list ${argument}; expected an export in ${SHARED_LISTS_FILE}`);
  }
  return values;
}

function normalizeCode(kind, value) {
  const code = kind === 'language' ? value.replace(/^lang_/, '') : value;
  return code.toLowerCase();
}

function collectCodes() {
  const codesByKind = { country: new Set(), language: new Set(), currency: new Set() };
  const sharedLists = loadSharedLists();
  for (const source of engineSources()) {
    for (const list of source.matchAll(OPTIONS_LIST_PATTERN)) {
      const kind = KIND_BY_FIELD_NAME[list[1]];
      if (!kind) continue;
      for (const entry of list[2].matchAll(OPTION_VALUE_PATTERN)) {
        codesByKind[kind].add(normalizeCode(kind, entry[1]));
      }
    }
    for (const call of source.matchAll(HELPER_CALL_PATTERN)) {
      const kind = KIND_BY_HELPER_NAME[call[1]];
      for (const value of helperCallValues(call[2], sharedLists)) {
        codesByKind[kind].add(normalizeCode(kind, value));
      }
    }
  }
  return codesByKind;
}

function isSentinel(kind, code) {
  if (kind === 'currency') return false;
  return Object.keys(SENTINEL_LABELS).some((key) => key.toLowerCase() === code);
}

function resolveLabel(kind, code) {
  const override = OVERRIDES_BY_KIND[kind][code];
  if (override) return override;
  let label;
  try {
    label = DISPLAY_NAMES[kind].of(UPPERCASE_KINDS.has(kind) ? code.toUpperCase() : code);
  } catch {
    return null;
  }
  if (!label || label.toLowerCase() === code) return null;
  return label;
}

function readExistingLocaleLabels() {
  if (!existsSync(OUTPUT_FILE)) return null;
  const source = readFileSync(OUTPUT_FILE, 'utf8');
  const table = /export const LOCALE_LABELS: Record<string, string> = \{([\s\S]*?)\n\};/.exec(source);
  if (!table) return null;
  const labels = {};
  for (const row of table[1].matchAll(/'((?:[^'\\]|\\.)*)': '((?:[^'\\]|\\.)*)',/g)) {
    labels[row[1]] = row[2].replace(/\\'/g, "'");
  }
  return Object.keys(labels).length ? labels : null;
}

function sortedEntries(labelsByCode) {
  return Object.keys(labelsByCode)
    .sort()
    .map((code) => [code, labelsByCode[code]]);
}

function renderTable(name, entries) {
  const rows = entries.map(([code, label]) => `  '${code}': '${label.replace(/'/g, "\\'")}',`);
  return `export const ${name}: Record<string, string> = {\n${rows.join('\n')}\n};`;
}

const codesByKind = collectCodes();
const tables = [renderTable('SENTINEL_LABELS', Object.entries(SENTINEL_LABELS))];
const errors = [];

for (const [kind, tableName] of [
  ['country', 'COUNTRY_LABELS'],
  ['language', 'LANGUAGE_LABELS'],
  ['currency', 'CURRENCY_LABELS'],
]) {
  const labels = {};
  const unresolved = [];
  for (const code of codesByKind[kind]) {
    if (isSentinel(kind, code)) continue;
    const label = resolveLabel(kind, code);
    if (label === null) unresolved.push(code);
    else labels[code] = label;
  }
  tables.push(renderTable(tableName, sortedEntries(labels)));
  if (unresolved.length) {
    errors.push(`unresolved ${kind} codes (add to scripts/overrides.mjs): ${unresolved.sort().join(', ')}`);
  }
}

const localeLabels = readExistingLocaleLabels();
if (localeLabels) {
  tables.push(renderTable('LOCALE_LABELS', sortedEntries(localeLabels)));
} else {
  errors.push(`no LOCALE_LABELS table found in ${OUTPUT_FILE}`);
}

writeFileSync(OUTPUT_FILE, `${tables.join('\n\n')}\n`);
console.log(`wrote ${OUTPUT_FILE}`);
for (const error of errors) console.error(error);
if (errors.length) process.exit(1);
