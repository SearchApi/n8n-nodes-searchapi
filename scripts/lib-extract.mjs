import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const ENGINE_DIR = 'nodes/SearchApi/engines';

export const KIND_BY_FIELD = {
  gl: 'country', cr: 'country', country: 'country', region: 'country', country_code: 'country',
  hl: 'language', lr: 'language', language: 'language', lang: 'language', content_languages: 'language',
  currency: 'currency',
  locale: 'locale',
};

const BLOCK = /name: '(\w+)',\n(\s*)type: 'options',\n\s*options: \[\n([\s\S]*?)\n\s*\],/g;
const ENTRY = /\{ name: '((?:[^'\\]|\\.)*)', value: '((?:[^'\\]|\\.)*)' \}/g;

export function engineFiles() {
  return readdirSync(ENGINE_DIR).filter((f) => f.endsWith('.ts') && f !== 'index.ts').sort();
}

export function optionLists(src) {
  const out = [];
  for (const m of src.matchAll(BLOCK)) {
    const entries = [...m[3].matchAll(ENTRY)].map((e) => ({ name: e[1], value: e[2] }));
    if (!entries.length) continue;
    out.push({ field: m[1], indent: m[2], entries, match: m[0], index: m.index });
  }
  return out;
}

export function allLists() {
  return engineFiles().flatMap((f) => {
    const src = readFileSync(join(ENGINE_DIR, f), 'utf8');
    return optionLists(src).map((l) => ({ file: f, ...l }));
  });
}

const HELPER_CALL = /options: (countryOptions|languageOptions|currencyOptions|localeOptions)\(\[([\s\S]*?)\]\)/g;
const KIND_OF_HELPER = {
  countryOptions: 'country',
  languageOptions: 'language',
  currencyOptions: 'currency',
  localeOptions: 'locale',
};

export function helperCalls(src) {
  return [...src.matchAll(HELPER_CALL)].map((m) => ({
    kind: KIND_OF_HELPER[m[1]],
    values: [...m[2].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((v) => v[1].replace(/\\'/g, "'")),
    index: m.index,
  }));
}

export function allHelperCalls() {
  return engineFiles().flatMap((f) => {
    const src = readFileSync(join(ENGINE_DIR, f), 'utf8');
    return helperCalls(src).map((c) => ({ file: f, ...c }));
  });
}
