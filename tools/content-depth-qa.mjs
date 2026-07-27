import fs from 'node:fs';
const read = path => fs.readFileSync(path, 'utf8');
const words = html => html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
const duplicateParagraphs = new Map(), bad = [];
const calculatorFiles = fs.readdirSync('tools').filter(f => f.endsWith('.html') && f !== 'index.html');
const articleFiles = [...fs.readdirSync('guides').filter(f => f.endsWith('.html') && f !== 'index.html').map(f => `guides/${f}`), ...fs.readdirSync('reference').filter(f => f.endsWith('.html') && f !== 'index.html').map(f => `reference/${f}`)];
const calculatorNeed = ['What this calculator solves', 'How to choose the inputs', 'How the calculation works', 'Worked production example', 'How to interpret the result', 'Common production mistakes', 'Production assumptions and limitations', 'Related production workflow'];
for (const file of calculatorFiles) { const path = `tools/${file}`, source = read(path); for (const heading of calculatorNeed) if (!source.includes(heading)) bad.push(`${path}: missing ${heading}`); if (words(source) < 550) bad.push(`${path}: short body`); }
for (const path of articleFiles) { const source = read(path); for (const heading of ['Purpose and production context', 'Definitions and distinctions', 'Inputs, units and method', 'Worked production example', 'Decision checklist', 'Common mistakes and cautions', 'Related workflow']) if (!source.includes(heading)) bad.push(`${path}: missing ${heading}`); if (!source.includes('Last reviewed: 2026-07-27')) bad.push(`${path}: missing review date`); const target = path.startsWith('guides/') ? 700 : 550; if (words(source) < target) bad.push(`${path}: short body`); }
for (const path of [...calculatorFiles.map(f => `tools/${f}`), ...articleFiles]) for (const paragraph of [...read(path).matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()).filter(p => p.split(' ').length >= 18)) duplicateParagraphs.set(paragraph, [...(duplicateParagraphs.get(paragraph) || []), path]);
for (const [paragraph, paths] of duplicateParagraphs) if (paths.length > 1) bad.push(`duplicate long paragraph: ${paragraph.slice(0, 140)} — ${paths.join(', ')}`);
if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
console.log(`Content QA PASS: ${calculatorFiles.length} calculators and ${articleFiles.length} articles`);
