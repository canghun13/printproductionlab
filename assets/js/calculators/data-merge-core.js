/* Local-only production data preparation. No network, storage or numeric coercion of source cells. */
(function (root) {
  'use strict';
  const limit = { bytes: 2 * 1024 * 1024, rows: 20000, columns: 100 };
  function parse(text, delimiter = 'auto') {
    if (new TextEncoder().encode(text).length > limit.bytes) throw Error('CSV exceeds the 2 MiB local processing limit. Split the source first.');
    text = text.replace(/^\uFEFF/, '');
    if (!text.trim()) throw Error('Enter CSV data with a header and at least one record.');
    if (text.includes('\0') || text.includes('\uFFFD')) throw Error('NUL or replacement characters found. Select the correct file encoding before checking.');
    if (delimiter === 'auto') {
      let first = '', quoted = false;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === '"') { if (quoted && text[i + 1] === '"') { first += '""'; i++; continue; } quoted = !quoted; }
        if (!quoted && /[\r\n]/.test(text[i])) break;
        first += text[i];
      }
      const counts = [',', '\t', ';'].map(d => { let q = false, n = 0; for (const c of first) { if (c === '"') q = !q; else if (!q && c === d) n++; } return [d, n]; });
      counts.sort((a, b) => b[1] - a[1]); delimiter = counts[0][0];
    }
    if (![',', '\t', ';'].includes(delimiter)) throw Error('Choose comma, tab or semicolon.');
    const records = [], lines = []; let row = [], cell = '', state = 'start', line = 1, startLine = 1, active = false;
    function endRow() {
      row.push(cell); records.push(row); lines.push(startLine); row = []; cell = ''; state = 'start'; active = false;
      if (records.length > limit.rows + 1) throw Error('More than 20,000 records. Split the source into smaller batches.');
    }
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (state === 'quoted') {
        if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else state = 'closed'; }
        else { cell += c; if (c === '\n' || (c === '\r' && text[i + 1] !== '\n')) line++; }
        continue;
      }
      if (c === delimiter) { row.push(cell); if (row.length >= limit.columns) throw Error('More than 100 columns. Reduce the source width.'); cell = ''; state = 'start'; active = true; continue; }
      if (c === '\n' || c === '\r') { endRow(); if (c === '\r' && text[i + 1] === '\n') i++; line++; startLine = line; continue; }
      if (state === 'closed') throw Error(`Unexpected character after a closing quote at physical line ${line}. Remove stray spaces or repair CSV quoting.`);
      if (c === '"') { if (state !== 'start') throw Error(`Unescaped quote at physical line ${line}. Quote the whole cell and double embedded quotes.`); state = 'quoted'; active = true; }
      else { cell += c; state = 'plain'; active = true; }
    }
    if (state === 'quoted') throw Error(`Unclosed quoted field beginning in the record at physical line ${startLine}.`);
    if (active || row.length || state === 'closed') endRow();
    const headers = records.shift(), headerLine = lines.shift();
    if (!records.length) throw Error('The header has no data records. Add at least one record.');
    if (headers.length > limit.columns) throw Error('More than 100 columns.');
    return { headers, rows: records, lines, headerLine, delimiter };
  }
  const formulaRisk = s => /^[\s\uFEFF]*[=+\-@＝＋－＠]/u.test(s) || /^[\t\r\n]/.test(s);
  function csv(rows, safeReport = false) {
    return rows.map(row => row.map(v => { let s = String(v ?? ''); if (safeReport && formulaRisk(s)) s = "'" + s; return '"' + s.replaceAll('"', '""') + '"'; }).join(',')).join('\r\n') + '\r\n';
  }
  function index(data, name) {
    const found = data.headers.reduce((a, h, i) => h === name ? [...a, i] : a, []);
    if (found.length !== 1) throw Error(`Field “${name}” must occur exactly once in the header. Copy the exact field name.`);
    return found[0];
  }
  function rectangular(data) {
    if (data.headers.some(h => !h.trim()) || new Set(data.headers).size !== data.headers.length) throw Error('Resolve blank or duplicate headers with CSV Preflight before processing.');
    if (data.rows.some(r => r.length !== data.headers.length)) throw Error('Resolve inconsistent column counts with CSV Preflight before processing.');
  }
  function preflight(data, required = [], idField = '') {
    const issues = [], add = (level, record, field, message) => issues.push([level, record, field, message]);
    const seen = new Set();
    data.headers.forEach((h, i) => { if (!h.trim()) add('ERROR', 'header', i + 1, 'Blank field name'); if (seen.has(h)) add('ERROR', 'header', h, 'Duplicate field name'); seen.add(h); if (h !== h.trim()) add('WARNING', 'header', h, 'Whitespace around field name'); if (/^['’]@/.test(h)) add('WARNING', 'header', h, 'Literal apostrophe before image header; inspect the exported CSV, not the spreadsheet display'); });
    required.forEach(h => { if (!data.headers.includes(h)) add('ERROR', 'header', h, 'Required field is missing'); });
    const id = idField ? index(data, idField) : -1, ids = new Map();
    data.rows.forEach((r, n) => {
      if (r.length !== data.headers.length) add('ERROR', n + 1, '', `Physical line ${data.lines[n]}: ${r.length} cells; expected ${data.headers.length}`);
      if (r.every(s => !s.trim())) add('WARNING', n + 1, '', 'Entirely blank record; do not assume the compositor will retain it');
      if (id >= 0) { const value = r[id] ?? ''; if (!value.trim()) add('ERROR', n + 1, idField, 'Blank record ID'); else if (ids.has(value)) add('ERROR', n + 1, idField, `Duplicate ID; first appears at record ${ids.get(value)}`); else ids.set(value, n + 1); }
      r.forEach((s, j) => {
        const h = data.headers[j] ?? `extra column ${j + 1}`;
        if (required.includes(h) && !s.trim()) add('ERROR', n + 1, h, 'Required value is blank');
        if (/^0\d+$/.test(s)) add('WARNING', n + 1, h, 'Leading-zero text: import as text; numeric conversion changes the printed value');
        if (/^\d{16,}$/.test(s)) add('WARNING', n + 1, h, 'Long numeric identifier: spreadsheet numeric precision may change it');
        if (formulaRisk(s)) add('WARNING', n + 1, h, 'Formula-like text: do not open an untrusted production CSV directly in a spreadsheet');
        if (/[\u202A-\u202E\u2066-\u2069\u200B]/u.test(s)) add('WARNING', n + 1, h, 'Invisible direction/zero-width character: review with the data owner');
      });
    });
    return issues;
  }
  function positiveInteger(value, name, max) { const n = Number(value); if (!String(value).trim() || !Number.isInteger(n) || n < 1 || n > max) throw Error(`${name} must be a whole number from 1 to ${max}.`); return n; }
  function sequence(data, across, down, lift, order, direction) {
    rectangular(data); across = positiveInteger(across, 'Across', 12); down = positiveInteger(down, 'Down', 12); lift = positiveInteger(lift, 'Sheets per lift', 1000);
    if (!['row', 'column'].includes(order) || !['top', 'bottom'].includes(direction)) throw Error('Choose a valid collection and sheet order.');
    const nup = across * down; if (nup * data.headers.length > 2000) throw Error('Expanded output exceeds 2,000 columns. Reduce n-up or source fields.');
    const cells = Array.from({ length: nup }, (_, i) => order === 'row' ? i : (i % down) * across + Math.floor(i / down));
    const headers = Array.from({ length: nup }, (_, c) => data.headers.map(h => `${h}__C${c + 1}`)).flat(), rows = [], map = []; let blanks = 0, batch = 0;
    for (let offset = 0; offset < data.rows.length;) {
      batch++; const sheets = Math.min(lift, Math.ceil((data.rows.length - offset) / nup));
      for (let s = 0; s < sheets; s++) {
        const physical = Array(nup), depth = direction === 'top' ? s : sheets - s - 1;
        cells.forEach((cell, stack) => {
          const source = offset + stack * sheets + depth, exists = source < data.rows.length;
          physical[cell] = exists ? data.rows[source] : data.headers.map(() => ''); if (!exists) blanks++;
          map.push([batch, s + 1, cell + 1, Math.floor(cell / across) + 1, cell % across + 1, exists ? source + 1 : 'BLANK']);
        }); rows.push(physical.flat());
      }
      offset += sheets * nup;
    }
    return { headers, rows, map, blanks, lifts: batch, nup };
  }
  function normalizePath(s) { return s.replaceAll('\\', '/').replace(/^\.\//, '').replace(/\/{2,}/g, '/'); }
  function matchAssets(data, field, assets, base = '') {
    rectangular(data); const col = index(data, field);
    if (assets.length > 10000) throw Error('At most 10,000 asset paths per check.');
    if (!assets.length) throw Error('Select image files/a folder or paste an asset-path manifest.');
    const names = assets.map(normalizePath), exact = new Map(), folded = new Map(), used = new Set(), output = [];
    names.forEach((name, i) => { exact.set(name, [...(exact.get(name) || []), i]); folded.set(name.toLowerCase(), [...(folded.get(name.toLowerCase()) || []), i]); });
    base = normalizePath(base).replace(/\/$/, '');
    data.rows.forEach((row, i) => {
      const raw = row[col]; let target = normalizePath(raw), status = 'MISSING';
      if (base && target.startsWith(base + '/')) target = target.slice(base.length + 1);
      let hits = exact.get(target) || [];
      if (hits.length === 1) status = 'EXACT';
      else if (hits.length > 1) status = 'AMBIGUOUS';
      else { hits = folded.get(target.toLowerCase()) || []; if (hits.length) status = hits.length === 1 ? 'CASE-ONLY' : 'AMBIGUOUS'; }
      if (!raw.trim()) status = 'BLANK';
      if (status === 'EXACT') used.add(hits[0]);
      output.push([i + 1, raw, target, status, hits.map(h => names[h]).join(' | ')]);
    });
    return { rows: output, unused: names.filter((_, i) => !used.has(i)) };
  }
  function fitText(text, options, measure) {
    const { width, height, padding, size, leading, mode } = options;
    if (![width, height, size, leading].every(n => Number.isFinite(n) && n > 0) || !Number.isFinite(padding) || padding < 0) throw Error('Frame, font size and leading must be positive; padding must be non-negative.');
    if (width > 2000 || height > 2000 || size > 300 || leading > 500) throw Error('Use frames up to 2,000 mm, fonts up to 300 pt and leading up to 500 pt.');
    if (!['wrap', 'single'].includes(mode)) throw Error('Choose single-line or wrapped text.');
    const usableWidth = (width - padding * 2) * 72 / 25.4, usableHeight = (height - padding * 2) * 72 / 25.4;
    if (usableWidth <= 0 || usableHeight <= 0) throw Error('Padding leaves no usable frame.');
    const graphemes = s => typeof Intl.Segmenter === 'function' ? [...new Intl.Segmenter(void 0, { granularity: 'grapheme' }).segment(s)].map(x => x.segment) : Array.from(s);
    const lines = [];
    for (const paragraph of text.split(/\r\n|\r|\n/)) {
      if (mode === 'single' || !paragraph) { lines.push(paragraph); continue; }
      let line = '';
      for (const token of paragraph.match(/\s+|\S+/gu) || []) {
        if (measure(line + token) <= usableWidth) { line += token; continue; }
        if (line) { lines.push(line); line = ''; }
        for (const glyph of graphemes(token)) { if (line && measure(line + glyph) > usableWidth) { lines.push(line); line = ''; } line += glyph; }
      }
      if (line) lines.push(line);
    }
    const widest = Math.max(0, ...lines.map(measure)), usedHeight = lines.length * leading;
    return { lines, widest, usedHeight, usableWidth, usableHeight, overflow: widest > usableWidth + 0.001 || usedHeight > usableHeight + 0.001 || (mode === 'single' && lines.length > 1) };
  }
  root.PPLDataMerge = { limit, parse, csv, formulaRisk, index, rectangular, preflight, sequence, matchAssets, fitText };
})(globalThis);
