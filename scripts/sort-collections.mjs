import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ENGINE_DIR, engineFiles } from './lib-extract.mjs';

function scanTo(src, start, open, close) {
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

function splitObjects(body) {
  const parts = [];
  let i = 0;
  while (i < body.length) {
    const brace = body.indexOf('{', i);
    if (brace === -1) break;
    const end = scanTo(body, brace, '{', '}');
    if (end === -1) break;
    parts.push({ start: brace, end, text: body.slice(brace, end + 1) });
    i = end + 1;
  }
  return parts;
}

const DISPLAY = /displayName: '((?:[^'\\]|\\.)*)'/;

let changed = 0;
const touched = [];

for (const file of engineFiles()) {
  const path = join(ENGINE_DIR, file);
  const src = readFileSync(path, 'utf8');
  const edits = [];

  for (const m of src.matchAll(/type: 'collection',/g)) {
    const optIdx = src.indexOf('options: [', m.index);
    if (optIdx === -1) continue;
    const arrStart = src.indexOf('[', optIdx);
    const arrEnd = scanTo(src, arrStart, '[', ']');
    if (arrEnd === -1) continue;

    const body = src.slice(arrStart + 1, arrEnd);
    const objects = splitObjects(body);
    if (objects.length < 2) continue;

    const named = objects.map((o) => ({ ...o, label: DISPLAY.exec(o.text)?.[1] }));
    if (named.some((o) => o.label === undefined)) continue;

    const sorted = [...named].sort((a, b) =>
      a.label.toLowerCase().localeCompare(b.label.toLowerCase(), 'en'),
    );
    if (sorted.every((o, i) => o === named[i])) continue;

    let rebuilt = '';
    let cursor = 0;
    for (let i = 0; i < named.length; i += 1) {
      rebuilt += body.slice(cursor, named[i].start) + sorted[i].text;
      cursor = named[i].end + 1;
    }
    rebuilt += body.slice(cursor);
    edits.push({ start: arrStart + 1, end: arrEnd, text: rebuilt });
  }

  if (!edits.length) continue;
  let out = src;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    out = out.slice(0, edit.start) + edit.text + out.slice(edit.end);
  }
  writeFileSync(path, out);
  changed += edits.length;
  touched.push(file);
}

console.log(`sorted ${changed} collections in ${touched.length} files: ${touched.join(', ')}`);
