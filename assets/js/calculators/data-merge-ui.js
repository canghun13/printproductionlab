(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('[data-merge]'); if (!app) return;
    const core = globalThis.PPLDataMerge, mode = app.dataset.merge, result = app.querySelector('.result'), output = document.getElementById('dm-output');
    const initial = result.innerHTML, fields = [...app.querySelectorAll('input,select,textarea')];
    const defaults = fields.map(e => ({ e, value: e.value, checked: e.checked })); let epoch = 0, fontFace = null;
    const get = id => document.getElementById(id), value = id => get(id).value;
    function node(tag, text, cls) { const e = document.createElement(tag); if (text != null) e.textContent = text; if (cls) e.className = cls; return e; }
    function clear() { epoch++; output.replaceChildren(); output.hidden = true; result.replaceChildren(node('p', 'Inputs changed. Run the check again for a current result.')); }
    app.addEventListener('input', clear); app.addEventListener('change', clear);
    app.querySelector('[data-reset]').addEventListener('click', event => {
      // Scoped reset: the legacy delegated handler assigns select.defaultValue,
      // which is not a select API. Keep that handler unchanged for existing tools.
      event.stopPropagation();
      epoch++; output.replaceChildren(); output.hidden = true;
      if (fontFace) { document.fonts.delete(fontFace); fontFace = null; }
      defaults.forEach(({e,value,checked}) => { e.value = e.type === 'file' ? '' : value; if (e.type === 'checkbox') e.checked = checked; }); result.innerHTML = initial;
    });
    async function source() {
      const file = get('dm-file').files[0]; if (!file) return value('dm-source');
      if (file.size > core.limit.bytes) throw Error('CSV file exceeds 2 MiB. Split it before processing.');
      try { return new TextDecoder(value('dm-encoding'), {fatal:true}).decode(await file.arrayBuffer()); }
      catch { throw Error('The file cannot be decoded with the selected encoding. Choose the correct encoding; the original file has not been changed.'); }
    }
    function table(headers, rows) {
      const wrap = node('div', null, 'dm-table-wrap'), t = node('table'), head = node('thead'), body = node('tbody'), hr = node('tr');
      headers.forEach(h => { const th = node('th', h); th.scope = 'col'; hr.append(th); }); head.append(hr);
      rows.slice(0,100).forEach(r => { const tr = node('tr'); r.forEach(v => tr.append(node('td', String(v).slice(0,350)))); body.append(tr); });
      t.append(head,body); wrap.append(t); output.append(wrap, node('p', `Showing ${Math.min(rows.length,100)} of ${rows.length} rows. Screen cells are limited to 350 characters; the report retains complete values. Tables scroll horizontally on small screens.`));
    }
    function download(label, filename, rows, report = true, guard = false) {
      let group = output.querySelector('.dm-downloads'); if (!group) { group = node('div', null, 'dm-downloads'); output.append(group); }
      const button = node('button', label); button.type = 'button'; group.append(button);
      if (guard) {
        button.disabled = true; const labelNode = node('label', null, 'dm-ack'), checkbox = node('input'); checkbox.type = 'checkbox'; checkbox.id = 'dm-export-ack';
        labelNode.append(checkbox, document.createTextNode('I understand this production CSV preserves formula-like text (including @ image headers). I will import trusted data as text, not open it directly in a spreadsheet.'));
        group.before(labelNode); checkbox.addEventListener('change', () => { button.disabled = !checkbox.checked; });
      }
      button.addEventListener('click', () => {
        const blob = new Blob([core.csv(rows,report)], {type:'text/csv;charset=utf-8'}), url = URL.createObjectURL(blob), a = node('a'); a.href = url; a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
      });
    }
    function success(headline, paragraphs) { result.replaceChildren(node('strong',headline),...paragraphs.map(p => node('p',p))); output.hidden = false; }
    function preview(text, fit, options, font) {
      const canvas = node('canvas',null,'dm-preview'), scale = Math.min(1,800/(options.width*96/25.4),600/(options.height*96/25.4));
      canvas.width = Math.ceil(options.width*96/25.4*scale); canvas.height = Math.ceil(options.height*96/25.4*scale); canvas.setAttribute('role','img'); canvas.setAttribute('aria-label',`Approximate frame preview: ${text.slice(0,120)}`);
      const ctx = canvas.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.fillStyle = '#173e2a'; ctx.textBaseline = 'top'; ctx.font = `${options.size*96/72*scale}px ${font}`;
      const pad = options.padding*96/25.4*scale; ctx.save(); ctx.beginPath(); ctx.rect(pad,pad,Math.max(0,canvas.width-pad*2),Math.max(0,canvas.height-pad*2)); ctx.clip();
      fit.lines.forEach((line,i) => ctx.fillText(line,pad,pad+i*options.leading*96/72*scale)); ctx.restore(); output.append(node('h2','Worst-record frame preview'),canvas,node('p','Preview is scaled to your screen and clipped to the entered inner frame. It is not an actual-size print proof or an InDesign composition.'));
    }
    get('dm-run').addEventListener('click', async () => {
      const ticket = ++epoch; output.replaceChildren(); output.hidden = true; result.replaceChildren(node('p','Checking local data…'));
      try {
        const text = await source(); if (ticket !== epoch) return;
        const delimiter = value('dm-delimiter') === 'tab' ? '\t' : value('dm-delimiter'), data = core.parse(text,delimiter);
        if (mode === 'preflight') {
          const issues = core.preflight(data,value('dm-required').split(',').map(s=>s.trim()).filter(Boolean),value('dm-id'));
          const errors = issues.filter(r=>r[0]==='ERROR').length;
          success(`${errors} errors / ${issues.length-errors} warnings`,[`${data.rows.length} records; ${data.headers.length} fields. Record 1 is the first data record, not the header.`, 'This checks the source table, not application-version compatibility, the artwork or final merged PDF. Warnings require review rather than automatic data correction.']);
          table(['Severity','Record','Field','Finding'],issues); download('Download issue report','data-merge-preflight-report.csv',[['Severity','Record','Field','Finding'],...issues]);
        } else if (mode === 'sequence') {
          const plan = core.sequence(data,value('dm-across'),value('dm-down'),value('dm-lift'),value('dm-order'),value('dm-direction'));
          success(`${plan.rows.length} sheet records / ${plan.lifts} lifts`,[`${data.rows.length} source records, ${plan.nup} cells per sheet, ${plan.blanks} blank cells. One exported row describes one complete physical sheet.`, 'Map every __C1, __C2… field set to its numbered template cell. Use single-record merge, not a second multi-record N-up or cut-stack pass. Verify a numbered dummy before the full run.']);
          table(['Lift','Emitted sheet within lift','Cell','Grid row','Grid column','Source record'],plan.map);
          const rows = [plan.headers,...plan.rows], risk = rows.some(r=>r.some(core.formulaRisk));
          download('Download production CSV','cut-stack-production.csv',rows,false,risk); download('Download cell map','cut-stack-cell-map.csv',[['Lift','Emitted sheet','Cell','Row','Column','Source record'],...plan.map]);
        } else if (mode === 'assets') {
          const files = [...get('dm-assets').files];
          const assets = files.length ? files.map(f=>f.webkitRelativePath ? f.webkitRelativePath.split('/').slice(1).join('/') : f.name) : value('dm-manifest').split(/\r?\n/).filter(s=>s.length);
          const match = core.matchAssets(data,value('dm-image'),assets,value('dm-base')), exact = match.rows.filter(r=>r[3]==='EXACT').length;
          success(`${exact} exact / ${match.rows.length-exact} need review`,[`${match.unused.length} selected asset paths are not used by an exact match. Case-only matches remain review items because file systems differ.`, 'This matches path strings only. It does not read image pixels, validate image formats, modify paths or guarantee the compositor can open the files.']);
          table(['Record','CSV value','Compared path','Status','Candidate paths'],match.rows);
          download('Download asset report','data-merge-asset-report.csv',[['Record','CSV value','Compared path','Status','Candidates'],...match.rows]);
          download('Download unused paths','data-merge-unused-paths.csv',[['Path not used by an exact match'],...match.unused.map(s=>[s])]);
        } else if (mode === 'text') {
          core.rectangular(data); const col = core.index(data,value('dm-text-field'));
          if (data.rows.length > 2000 || data.rows.reduce((n,r)=>n+r[col].length,0)>200000 || data.rows.some(r=>r[col].length>4000)) throw Error('Text screening limit: 2,000 records, 200,000 total characters and 4,000 per cell. Split the source first.');
          const options = Object.fromEntries(['width','height','padding','size','leading'].map(k=>[k,Number(value('dm-'+k))])); options.mode = value('dm-wrap');
          if (['width','height','padding','size','leading'].some(k=>!value('dm-'+k).trim())) throw Error('Complete every frame and typography value; blank is not zero.');
          let font = value('dm-font'), fontNote = 'System font selected; substitution and missing glyphs are not detected.';
          const file = get('dm-font-file').files[0];
          if (file) {
            if (file.size>10*1024*1024) throw Error('Font file exceeds 10 MiB. Use a smaller licensed font file.');
            const loaded = await new FontFace('DMPreview'+ticket,await file.arrayBuffer()).load();
            if (ticket !== epoch) return; if (fontFace) document.fonts.delete(fontFace); fontFace = loaded; document.fonts.add(loaded); font = '"'+loaded.family+'"'; fontNote = 'Local font loaded for this browser check; missing-glyph fallback may still occur.';
          }
          await document.fonts.ready; if (ticket !== epoch) return;
          const ctx = document.createElement('canvas').getContext('2d'); ctx.font = `${options.size}px ${font}`;
          // Canvas px here are numerically typographic points. The pure model uses pt for every measured width.
          const measured = data.rows.map((r,i)=>({record:i+1,text:r[col],fit:core.fitText(r[col],options,s=>ctx.measureText(s).width)}));
          const bad = measured.filter(r=>r.fit.overflow), empty = measured.filter(r=>!r.text.trim());
          const sorted = [...measured].sort((a,b)=>(Number(b.fit.overflow)-Number(a.fit.overflow)) || Math.max(b.fit.widest/b.fit.usableWidth,b.fit.usedHeight/b.fit.usableHeight)-Math.max(a.fit.widest/a.fit.usableWidth,a.fit.usedHeight/a.fit.usableHeight));
          success(`${bad.length} overflow estimates / ${empty.length} empty`,[`${measured.length} records screened. ${fontNote}`, 'Plain regular-weight text only: one leading interval per line, spaces preserved, long words may break at grapheme boundaries. No hyphenation, styled fields, tables, threaded frames or final compositor certification.']);
          const rows = sorted.map(r=>[r.record,r.text,r.fit.lines.length,r.fit.widest.toFixed(2),r.fit.usedHeight.toFixed(2),!r.text.trim()?'EMPTY':r.fit.overflow?'REVIEW OVERFLOW':'FIT ESTIMATE']);
          preview(sorted[0].text,sorted[0].fit,options,font); table(['Record','Text','Lines','Widest (pt)','Used height (pt)','Status'],rows);
          download('Download text-fit report','variable-text-fit-report.csv',[['Record','Text','Lines','Widest pt','Used height pt','Status'],...rows]);
        }
      } catch (error) { if (ticket === epoch) { result.replaceChildren(node('p',error.message,'error')); output.replaceChildren(); output.hidden = true; } }
    });
  });
})();
