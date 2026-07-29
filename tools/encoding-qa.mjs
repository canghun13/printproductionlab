import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const root = process.cwd();
const textExtensions = new Set(['.html', '.js', '.css', '.json', '.xml']);
const ignoredDirectories = new Set(['.git', '.agents', 'node_modules']);
const failures = [];

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) walk(join(directory, entry.name));
      continue;
    }
    const file = join(directory, entry.name);
    if (!textExtensions.has(extname(file))) continue;
    if (relative(root, file).startsWith('tools/') && extname(file) !== '.html') continue;
    inspect(file);
  }
}

function lineFor(source, index) {
  return source.slice(0, index).split('\n').length;
}

function inspect(file) {
  const bytes = readFileSync(file);
  let source;
  try {
    source = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    failures.push(`${relative(root, file)}: invalid UTF-8`);
    return;
  }
  if (extname(file) === '.html' && !/<meta\s+charset=["']?utf-8["']?\s*\/?>/i.test(source.slice(0, 4096))) {
    failures.push(`${relative(root, file)}: missing early UTF-8 charset declaration`);
  }
  const forbidden = /횞|첨|\uFFFD|Â|Ã|â€|â€™|â€œ|â€”|â€“|&amp;(?:times|divide|quot|apos|micro|sup2);|[가-힣]/g;
  for (const match of source.matchAll(forbidden)) {
    failures.push(`${relative(root, file)}:${lineFor(source, match.index)}: forbidden visible-text encoding marker ${JSON.stringify(match[0])}`);
  }
}

walk(root);
const paper = readFileSync(join(root, 'tools', 'paper-weight-calculator.html'), 'utf8');
if (!paper.includes('Formula: width &times; height &divide; 1,000,000 &times; gsm &divide; 1,000.')) {
  failures.push('tools/paper-weight-calculator.html: expected paper-weight formula is missing');
}
if (failures.length) {
  console.error(`ENCODING QA FAIL (${failures.length})`);
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('ENCODING QA PASS: UTF-8, charset, mojibake, visible Korean, and paper-weight formula checked.');
