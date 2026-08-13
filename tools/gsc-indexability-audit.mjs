import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const host = 'https://printproductionlab.com';
const targets = [
  '/contact.html','/guides/','/guides/booklet-creep.html','/guides/paper-job-weight.html','/guides/post-press-preflight.html','/guides/print-imposition.html','/guides/print-job-cost.html','/guides/signatures.html','/reference/margin-gripper.html','/tools/','/tools/brochure-fold-panel-calculator.html','/tools/coil-binding.html','/tools/cutting-stack-lift-planner.html','/tools/folding-allowance-planner.html','/tools/gate-fold-panel-calculator.html','/tools/lamination-material-cost-calculator.html','/tools/post-press-finishing.html','/tools/post-press-time-cost-planner.html','/tools/roll-fold-panel-calculator.html'
];
const htmlFiles = [];
function walk(dir) { for (const entry of readdirSync(dir, { withFileTypes: true })) { const file = join(dir, entry.name); if (entry.isDirectory() && !['.git','.agents','node_modules'].includes(entry.name)) walk(file); else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(file); } }
walk(root);
const sourceByUrl = new Map();
for (const file of htmlFiles) {
  const rel = relative(root, file).replaceAll('\\','/');
  const url = rel === 'index.html' ? '/' : rel.endsWith('/index.html') ? `/${rel.slice(0, -10)}` : `/${rel}`;
  sourceByUrl.set(url, readFileSync(file, 'utf8'));
}
const inbound = new Map(targets.map(target => [target, []]));
for (const [from, source] of sourceByUrl) {
  if (/noindex/i.test(source)) continue;
  for (const href of source.matchAll(/<a\b[^>]*\bhref=["']([^"'#?]+)["']/gi)) {
    let to = href[1];
    if (!to.startsWith('/')) continue;
    if (to.endsWith('index.html')) to = to.replace(/index\.html$/, '');
    if (inbound.has(to)) inbound.get(to).push(from);
  }
}
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
const robots = readFileSync(join(root, 'robots.txt'), 'utf8');
const rows = targets.map(url => {
  const source = sourceByUrl.get(url);
  const canonical = source?.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] || '';
  const title = /<title>[^<]+<\/title>/i.test(source || '');
  const h1 = (source?.match(/<h1\b[^>]*>/gi) || []).length === 1;
  return { url, file: !!source, canonical: canonical === `${host}${url}`, robots: /<meta name="robots" content="index,follow">/i.test(source || ''), noindex: /noindex/i.test(source || ''), sitemap: sitemap.includes(`<loc>${host}${url}</loc>`), inbound: inbound.get(url).length, from: inbound.get(url).join(', '), title, h1, robotsBlocked: robots.includes(`Disallow: ${url}`) };
});
const failures = rows.filter(row => !row.file || !row.canonical || !row.robots || row.noindex || !row.sitemap || !row.title || !row.h1 || row.robotsBlocked || !row.inbound);
const markdown = ['| URL | HTTP | Canonical | Robots | Sitemap | Internal links | Status |','|---|---:|---|---|---|---:|---|', ...rows.map(row => `| \`${row.url}\` | pending | ${row.canonical?'PASS':'FAIL'} | ${row.robots&&!row.noindex&&!row.robotsBlocked?'PASS':'FAIL'} | ${row.sitemap?'PASS':'FAIL'} | ${row.inbound} | ${!failures.includes(row)?'static PASS':'CHECK'} |`)].join('\n');
writeFileSync(join(root, 'tools', 'gsc-indexability-report.md'), markdown + '\n', 'utf8');
if (failures.length) { console.error(`GSC INDEXABILITY STATIC QA FAIL (${failures.length})\n${failures.map(row => row.url).join('\n')}`); process.exit(1); }
console.log(`GSC INDEXABILITY STATIC QA PASS: ${rows.length} affected URLs; report written to tools/gsc-indexability-report.md.`);
