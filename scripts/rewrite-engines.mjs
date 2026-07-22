import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ENGINE_DIR, engineFiles, optionLists, KIND_BY_FIELD } from './lib-extract.mjs';

const HELPER = {
  country: 'countryOptions',
  language: 'languageOptions',
  currency: 'currencyOptions',
  locale: 'localeOptions',
};

function renderCall(kind, indent, values) {
  const inner = `${indent}  `;
  const lines = [];
  let current = inner;
  for (const value of values) {
    const token = `'${value.replace(/'/g, "\\'")}',`;
    if (current !== inner && current.length + token.length > 110) {
      lines.push(current.trimEnd());
      current = inner;
    }
    current += (current === inner ? '' : ' ') + token;
  }
  if (current.trim()) lines.push(current.trimEnd());
  return `${HELPER[kind]}([\n${lines.join('\n')}\n${indent}])`;
}

let totalLists = 0;
let totalFiles = 0;

for (const file of engineFiles()) {
  const path = join(ENGINE_DIR, file);
  let src = readFileSync(path, 'utf8');
  const lists = optionLists(src).filter((l) => KIND_BY_FIELD[l.field] && l.entries.length >= 15);
  if (!lists.length) continue;

  const used = new Set();
  for (const list of [...lists].sort((a, b) => b.index - a.index)) {
    const kind = KIND_BY_FIELD[list.field];
    used.add(HELPER[kind]);
    const call = renderCall(kind, list.indent, list.entries.map((e) => e.value));
    const replacement = `name: '${list.field}',\n${list.indent}type: 'options',\n${list.indent}options: ${call},`;
    src = src.slice(0, list.index) + replacement + src.slice(list.index + list.match.length);
    totalLists += 1;
  }

  const depth = file === 'index.ts' ? '.' : '..';
  const importLine = `import { ${[...used].sort().join(', ')} } from '${depth}/shared/options';\n`;
  const lastImport = src.lastIndexOf("';\n", src.indexOf('\n\n'));
  src = src.slice(0, lastImport + 3) + importLine + src.slice(lastImport + 3);

  writeFileSync(path, src);
  totalFiles += 1;
}

console.log(`rewrote ${totalLists} option lists across ${totalFiles} engine files`);
