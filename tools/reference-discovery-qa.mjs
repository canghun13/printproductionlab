import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';

const read=file=>fs.readFileSync(file,'utf8').replaceAll('\r\n','\n').trimEnd();
const hub=read('reference/index.html'), article=read('reference/binding-page-count.html');
const card='<a class="panel tool" href="/reference/binding-page-count.html"><h2>Binding Method and Page Count Reference</h2><p>Page-count rules for saddle stitching, signatures and binding selection.</p></a>';
assert.equal(hub.split(card).length-1,1,'One crawlable card, not a script-only link');
assert.ok(article.includes('href="/tools/signature-count.html">Signature Count Calculator</a>'));
assert.ok(article.includes('href="/guides/signatures.html">How Signatures Work in Book Printing</a>'));
const builder=read('tools/build-content.mjs');
const call=builder.match(/hub\('reference',[^\n]*?\);/)?.[0];assert.ok(call);
let captured;
vm.runInNewContext(call,{refs:[['existing','Existing entry','Preserved']],hub:(kind,rows)=>{assert.equal(kind,'reference');captured=rows;}},{timeout:1000});
assert.deepEqual(Array.from(captured[0]),['existing','Existing entry','Preserved']);
assert.deepEqual(Array.from(captured.find(r=>r[0]==='binding-page-count')),['binding-page-count','Binding Method and Page Count Reference','Page-count rules for saddle stitching, signatures and binding selection.']);

const loadRenderer=source=>vm.runInNewContext(source.split('for (const file of Object.keys(calculators))')[0].replace(/^import fs from 'node:fs';\s*/, '')+'\n({articleContent,articles});',{}, {timeout:1000});
const current=loadRenderer(read('tools/rebuild-content.mjs'));
const generated=current.articleContent('reference','binding-page-count.html',article);
assert.ok(generated.includes('href="/tools/signature-count.html">Signature Count Calculator</a>'));
assert.ok(generated.includes('href="/guides/signatures.html">How Signatures Work in Book Printing</a>'));

const baseline=process.argv.find(x=>x.startsWith('--baseline='))?.slice(11);
let unchangedArticles=0;
if(baseline){
  const old=file=>execFileSync('git',['show',`${baseline}:${file}`],{encoding:'utf8'}).replaceAll('\r\n','\n').trimEnd();
  assert.equal(hub,old('reference/index.html').replace('<a class="panel tool" href="/reference/resolution-viewing.html">',card+'<a class="panel tool" href="/reference/resolution-viewing.html">'));
  assert.equal(article,old('reference/binding-page-count.html').replace('href="/tools/print-imposition-calculator.html">Signature Count Calculator','href="/tools/signature-count.html">Signature Count Calculator').replace('href="/guides/">How Signatures Work in Book Printing','href="/guides/signatures.html">How Signatures Work in Book Printing'));
  execFileSync('git',['diff','--exit-code',baseline,'--','assets/css','assets/js','sitemap.xml','robots.txt','llms.txt'],{stdio:'pipe'});
  const previous=loadRenderer(old('tools/rebuild-content.mjs'));
  for(const type of Object.keys(current.articles))for(const file of Object.keys(current.articles[type])){
    const input=read(`${type}/${file}`),before=previous.articleContent(type,file,input),after=current.articleContent(type,file,input);
    if(type==='reference'&&file==='binding-page-count.html')assert.equal(after,before.replace('href="/tools/print-imposition-calculator.html">Signature Count Calculator','href="/tools/signature-count.html">Signature Count Calculator').replace('href="/guides/">How Signatures Work in Book Printing','href="/guides/signatures.html">How Signatures Work in Book Printing'));
    else {assert.equal(after,before,`${type}/${file}: unrelated renderer output`);unchangedArticles++;}
  }
}
console.log(`REFERENCE DISCOVERY QA PASS: hub card, two exact destinations, retained hub/article source; ${baseline?'two HTML and CSS/JS/SEO scope checks; '+unchangedArticles+' unrelated article outputs unchanged':'no baseline comparison requested'}`);
