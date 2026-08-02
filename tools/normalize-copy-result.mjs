import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tools = path.join(root, 'tools');

for (const name of fs.readdirSync(tools).filter(name => name.endsWith('.html'))) {
  const file = path.join(tools, name);
  const source = fs.readFileSync(file, 'utf8');
  if (!source.includes('class="calculator"')) continue;
  const normalized = source
    .replace(/<button class="copy" data-copy>Copy result<\/button>/g, '')
    .replace(/src="\.\.\/assets\/js\/main\.js(?:\?[^\"]*)?"/g, 'src="../assets/js/main.js?v=copy-result-20260802c"');
  if (normalized !== source) fs.writeFileSync(file, normalized);
}
