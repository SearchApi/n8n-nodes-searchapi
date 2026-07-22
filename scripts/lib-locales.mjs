import { existsSync, readFileSync } from 'node:fs';

const RAILS_LOCALES =
  process.env.RAILS_DUCKDUCKGO_CONSTANTS ?? '../searchapi.io/app/lib/constants/duckduckgo.rb';

const ROW = /"([a-z-]+)" => \{"country" => "([^"]*)", "language" => "([^"]*)"\}/g;

export function railsLocaleLabels() {
  if (!existsSync(RAILS_LOCALES)) return null;
  const labels = {};
  for (const m of readFileSync(RAILS_LOCALES, 'utf8').matchAll(ROW)) {
    const [, code, country, language] = m;
    labels[code] = country === language ? country : `${country} (${language})`;
  }
  return Object.keys(labels).length ? labels : null;
}

export function existingLabels(path, name) {
  if (!existsSync(path)) return null;
  const block = new RegExp(`export const ${name}: Record<string, string> = \\{([\\s\\S]*?)\\n\\};`).exec(
    readFileSync(path, 'utf8'),
  );
  if (!block) return null;
  const labels = {};
  for (const m of block[1].matchAll(/'((?:[^'\\]|\\.)*)': '((?:[^'\\]|\\.)*)',/g)) {
    labels[m[1]] = m[2].replace(/\\'/g, "'");
  }
  return Object.keys(labels).length ? labels : null;
}
