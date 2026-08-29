import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ENGINE_DIR } from './lib-extract.mjs';

const LEGACY = {
  'google.ts': ['kgmid', 'device', 'optimization_strategy'],
  'google_images.ts': ['device', 'page'],
  'google_maps.ts': ['ll', 'page'],
  'google_shopping.ts': ['page'],
};

function scan(src, start, open, close) {
  let depth = 0;
  let quote = null;
  for (let i = start; i < src.length; i += 1) {
    const ch = src[i];
    if (quote) {
      if (ch === '\\') i += 1;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') quote = ch;
    else if (ch === open) depth += 1;
    else if (ch === close) {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function objectAround(src, index) {
  let depth = 0;
  for (let i = index; i >= 0; i -= 1) {
    if (src[i] === '}') depth += 1;
    else if (src[i] === '{') {
      if (depth === 0) return { start: i, end: scan(src, i, '{', '}') };
      depth -= 1;
    }
  }
  return null;
}

let moved = 0;

for (const [file, params] of Object.entries(LEGACY)) {
  const path = join(ENGINE_DIR, file);
  let src = readFileSync(path, 'utf8');

  for (const param of params) {
    const hit = new RegExp(`\\n        name: '${param}',\\n`).exec(src);
    if (!hit) {
      console.log(`  ${file}: ${param} already top-level`);
      continue;
    }
    const inner = objectAround(src, hit.index + 1);
    const property = src.slice(inner.start, inner.end + 1);

    const collection = objectAround(src, inner.start - 1);
    const collectionText = src.slice(collection.start, collection.end + 1);

    const dedented = property
      .split('\n')
      .map((line, i) => (i === 0 ? line : line.replace(/^ {4}/, '')))
      .join('\n')
      .replace(/\n(\s*)routing: \{/, '\n$1displayOptions,\n$1routing: {');

    // drop the property (and a trailing or leading comma) from the collection
    let trimmed = collectionText.replace(property, '');
    trimmed = trimmed.replace(/\{\s*,/g, '{').replace(/,(\s*,)+/g, ',').replace(/,(\s*[\]}])/g, '$1');

    const optStart = trimmed.indexOf('options: [');
    const optEnd = scan(trimmed, trimmed.indexOf('[', optStart), '[', ']');
    const bodyEmpty = !/\{/.test(trimmed.slice(trimmed.indexOf('[', optStart) + 1, optEnd));

    const replacement = bodyEmpty ? `${dedented},` : `${dedented},\n  ${trimmed},`;
    src = src.slice(0, collection.start) + replacement + src.slice(collection.end + 2);
    moved += 1;
    console.log(`  ${file}: ${param} -> top level${bodyEmpty ? ' (collection removed)' : ''}`);
  }

  writeFileSync(path, src);
}

console.log(`promoted ${moved} legacy parameters`);
