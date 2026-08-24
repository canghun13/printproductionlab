(() => {
  const result = () => document.getElementById('result');
  const number = id => Number(document.getElementById(id)?.value);
  const positive = values => values.every(value => Number.isFinite(value) && value > 0);
  const nonNegative = values => values.every(value => Number.isFinite(value) && value >= 0);
  const fmt = (value, digits = 2) => Number(value.toFixed(digits)).toLocaleString(undefined, { maximumFractionDigits: digits });
  const error = message => { result().innerHTML = '<p class="error">' + message + '</p>'; };
  const units = {
    mm: { toMm: 1, label: 'mm' },
    cm: { toMm: 10, label: 'cm' },
    m: { toMm: 1000, label: 'm' },
    in: { toMm: 25.4, label: 'in' },
    ft: { toMm: 304.8, label: 'ft' }
  };
  const paper = {
    iso: [
      ['A4', 210, 297], ['A3', 297, 420], ['A2', 420, 594], ['A1', 594, 841], ['A0', 841, 1189]
    ],
    ansi: [
      ['ANSI A', 215.9, 279.4], ['ANSI B', 279.4, 431.8], ['ANSI C', 431.8, 558.8], ['ANSI D', 558.8, 863.6], ['ANSI E', 863.6, 1117.6]
    ],
    arch: [
      ['ARCH A', 228.6, 304.8], ['ARCH B', 304.8, 457.2], ['ARCH C', 457.2, 609.6], ['ARCH D', 609.6, 914.4], ['ARCH E1', 762, 1066.8], ['ARCH E', 914.4, 1219.2]
    ]
  };

  const scaleConverter = () => {
    const drawing = number('drawing-length');
    const denominator = number('scale-denominator');
    const drawingUnit = document.getElementById('drawing-unit').value;
    const outputUnit = document.getElementById('real-unit').value;
    if (!positive([drawing, denominator])) return error('Enter a drawing length and scale denominator greater than zero.');
    const realMm = drawing * units[drawingUnit].toMm * denominator;
    const real = realMm / units[outputUnit].toMm;
    result().innerHTML = '<strong>' + fmt(real, 3) + ' ' + units[outputUnit].label + ' real length</strong><p>' + fmt(drawing, 3) + ' ' + units[drawingUnit].label + ' on a 1:' + fmt(denominator, 3) + ' drawing represents ' + fmt(real, 3) + ' ' + units[outputUnit].label + '. Real length = measured drawing length × scale denominator.</p>';
  };

  const printScaling = () => {
    const source = number('source-scale');
    const target = number('target-scale');
    if (!positive([source, target])) return error('Enter source and target scale denominators greater than zero.');
    const percent = source / target * 100;
    const direction = percent > 100 ? 'enlarge' : percent < 100 ? 'reduce' : 'print at original size';
    result().innerHTML = '<strong>' + fmt(percent, 2) + '% print scale</strong><p>To change 1:' + fmt(source, 2) + ' artwork to 1:' + fmt(target, 2) + ', ' + direction + ' to ' + fmt(percent, 2) + '%. A 100 mm scale bar on the source should measure ' + fmt(percent, 2) + ' mm on the new print.</p>';
  };

  const sheetFit = () => {
    const realWidth = number('real-width');
    const realHeight = number('real-height');
    const denominator = number('fit-scale');
    const margin = number('sheet-margin');
    const series = document.getElementById('paper-series').value;
    if (!positive([realWidth, realHeight, denominator]) || !nonNegative([margin])) return error('Enter positive real dimensions and scale, plus a non-negative sheet margin.');
    const drawingWidth = realWidth * 1000 / denominator;
    const drawingHeight = realHeight * 1000 / denominator;
    const requiredWidth = drawingWidth + margin * 2;
    const requiredHeight = drawingHeight + margin * 2;
    const match = paper[series].map(([name, width, height]) => {
      const portrait = requiredWidth <= width && requiredHeight <= height;
      const landscape = requiredWidth <= height && requiredHeight <= width;
      return portrait || landscape ? { name, width, height, orientation: portrait ? 'portrait' : 'landscape' } : null;
    }).find(Boolean);
    const footprint = fmt(drawingWidth, 1) + ' × ' + fmt(drawingHeight, 1) + ' mm';
    if (!match) {
      result().innerHTML = '<strong>No listed sheet fits</strong><p>The scaled drawing footprint is ' + footprint + '; with margins it needs ' + fmt(requiredWidth, 1) + ' × ' + fmt(requiredHeight, 1) + ' mm. Use a larger custom sheet, a smaller scale, or the Plan Tiling Calculator.</p>';
      return;
    }
    result().innerHTML = '<strong>' + match.name + ' ' + match.orientation + '</strong><p>Drawing footprint: ' + footprint + '. Required area with ' + fmt(margin, 1) + ' mm margins: ' + fmt(requiredWidth, 1) + ' × ' + fmt(requiredHeight, 1) + ' mm. Selected sheet: ' + fmt(match.width, 1) + ' × ' + fmt(match.height, 1) + ' mm.</p>';
  };

  const verifyScale = () => {
    const realLength = number('known-real-length');
    const measured = number('measured-print-length');
    const stated = number('stated-scale');
    if (!positive([realLength, measured, stated])) return error('Enter a known real length, measured print length, and stated denominator greater than zero.');
    const realMm = realLength * 1000;
    const expected = realMm / stated;
    const actual = realMm / measured;
    const deviation = (measured / expected - 1) * 100;
    const correction = expected / measured * 100;
    const verdict = Math.abs(deviation) <= 0.5 ? 'within ±0.5%' : 'outside ±0.5%';
    result().innerHTML = '<strong>Effective scale 1:' + fmt(actual, 2) + '</strong><p>Expected check length: ' + fmt(expected, 2) + ' mm; measured: ' + fmt(measured, 2) + ' mm; size deviation: ' + (deviation >= 0 ? '+' : '') + fmt(deviation, 2) + '% (' + verdict + '). If the current file and device settings are otherwise unchanged, a correction print factor of ' + fmt(correction, 2) + '% would bring this check dimension back to nominal.</p>';
  };

  const tileCount = (planW, planH, sheetW, sheetH, overlap) => {
    const stepW = sheetW - overlap;
    const stepH = sheetH - overlap;
    if (stepW <= 0 || stepH <= 0) return null;
    const columns = Math.max(1, Math.ceil((planW - overlap) / stepW));
    const rows = Math.max(1, Math.ceil((planH - overlap) / stepH));
    return { columns, rows, pages: columns * rows, coverageW: columns * stepW + overlap, coverageH: rows * stepH + overlap };
  };

  const tiling = () => {
    const planW = number('plan-width');
    const planH = number('plan-height');
    const sheetW = number('printable-width');
    const sheetH = number('printable-height');
    const overlap = number('tile-overlap');
    if (!positive([planW, planH, sheetW, sheetH]) || !nonNegative([overlap])) return error('Enter positive plan and printable dimensions plus a non-negative overlap.');
    const normal = tileCount(planW, planH, sheetW, sheetH, overlap);
    const rotated = tileCount(planW, planH, sheetH, sheetW, overlap);
    if (!normal || !rotated) return error('Overlap must be smaller than both printable sheet dimensions.');
    const best = normal.pages <= rotated.pages ? { ...normal, orientation: 'normal' } : { ...rotated, orientation: 'rotated' };
    result().innerHTML = '<strong>' + best.pages + ' tiles (' + best.columns + ' × ' + best.rows + ')</strong><p>Best arrangement uses the sheet ' + best.orientation + '. Normal: ' + normal.columns + ' × ' + normal.rows + ' = ' + normal.pages + ' pages; rotated: ' + rotated.columns + ' × ' + rotated.rows + ' = ' + rotated.pages + ' pages. Planned coverage is ' + fmt(best.coverageW, 1) + ' × ' + fmt(best.coverageH, 1) + ' mm including shared overlaps.</p>';
  };

  const actions = { scaleConverter, printScaling, sheetFit, verifyScale, tiling };
  window.runReprographics = name => actions[name]?.();
})();
