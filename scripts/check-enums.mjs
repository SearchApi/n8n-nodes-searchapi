import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ENGINE_DIR, engineFiles, KIND_BY_FIELD } from './lib-extract.mjs';
import { resolve } from './lib-labels.mjs';
import { existingLabels } from './lib-locales.mjs';

const SPEC_DIR = process.env.OPENAPI_DIR ?? '../searchapi.io/public/openapi';

const CALL = /options: (countryOptions|languageOptions|currencyOptions|localeOptions)\(\[([\s\S]*?)\]\)/g;
const NAME = /name: '(\w+)',\n\s*type: 'options',\n\s*$/;
const KIND_OF_HELPER = {
  countryOptions: 'country',
  languageOptions: 'language',
  currencyOptions: 'currency',
  localeOptions: 'locale',
};

const LOCALE_LABELS = existingLabels('nodes/SearchApi/shared/labels.ts', 'LOCALE_LABELS') ?? {};

function hasLabel(kind, value) {
  if (kind !== 'locale') return resolve(kind, value) !== null;
  return value === '' || value in LOCALE_LABELS;
}

const problems = [];

function specEnum(engine, param) {
  const path = join(SPEC_DIR, `${engine}.yaml`);
  if (!existsSync(path)) return null;
  const spec = readFileSync(path, 'utf8');
  const start = new RegExp(`\\n\\s*name: ${param}\\n`).exec(spec);
  if (!start) return null;
  const rest = spec.slice(start.index + start[0].length);
  const next = /\n\s*name: \w+\n/.exec(rest);
  const block = /\n\s*enum: \[([^\]]*)\]/.exec(rest.slice(0, next ? next.index : undefined));
  if (!block) return null;
  return new Set(
    block[1]
      .split(',')
      .map((token) => token.trim().replace(/^["']|["']$/g, ''))
      .filter((token) => token !== ''),
  );
}

for (const file of engineFiles()) {
  const engine = file.replace(/\.ts$/, '');
  const src = readFileSync(join(ENGINE_DIR, file), 'utf8');

  for (const match of src.matchAll(CALL)) {
    const kind = KIND_OF_HELPER[match[1]];
    const before = src.slice(0, match.index);
    const field = NAME.exec(before)?.[1];
    const values = [...match[2].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]);

    for (const value of values) {
      if (!hasLabel(kind, value)) {
        problems.push(`${file}: ${field ?? match[1]} value '${value}' has no canonical label`);
      }
    }

    const after = src.slice(match.index + match[0].length);
    const dflt = /^,\n\s*default: '((?:[^'\\]|\\.)*)',/.exec(after);
    if (dflt && !values.includes(dflt[1])) {
      problems.push(`${file}: ${field ?? match[1]} default '${dflt[1]}' is not one of its options`);
    }

    if (!field || !(field in KIND_BY_FIELD)) continue;
    const allowed = specEnum(engine, field);
    if (!allowed) continue;
    for (const value of values) {
      if (value !== '' && !allowed.has(value)) {
        problems.push(`${file}: ${field} value '${value}' is not in ${engine}.yaml enum`);
      }
    }
    for (const value of allowed) {
      if (!values.includes(value)) {
        problems.push(`${file}: ${field} is missing '${value}' from ${engine}.yaml enum`);
      }
    }
  }
}

if (!existsSync(SPEC_DIR)) {
  console.error(`openapi specs not found at ${SPEC_DIR}; set OPENAPI_DIR to enable spec validation`);
}

if (problems.length) {
  for (const problem of problems) console.error(problem);
  console.error(`\n${problems.length} enum problems`);
  process.exit(1);
}
console.log(`enum check passed across ${readdirSync(ENGINE_DIR).length} engine files`);
