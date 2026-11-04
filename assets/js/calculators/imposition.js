/* Equal-size, uniform-orientation planning only. All dimensions share one unit. */
(() => {
  const plan = values => {
    if (!Array.isArray(values) || values.length !== 7 || !values.every(v => typeof v === 'number' && Number.isFinite(v))) throw Error('Enter a finite number in every dimension and allowance field.');
    const [pw, ph, bleed, fw, fh, grip, outer] = values;
    if (![pw, ph, fw, fh].every(v => v > 0) || ![bleed, grip, outer].every(v => v >= 0)) throw Error('Enter positive sheet and finished dimensions, with non-negative allowances.');
    const uw = pw - 2 * outer, uh = ph - 2 * outer - grip, parentArea = pw * ph;
    if (uw <= 0 || uh <= 0) throw Error('No usable area remains after the outer margins and gripper allowance.');
    const rangeError = () => { throw Error('These dimensions exceed the supported numeric range. Use consistent practical units.'); };
    if (![uw, uh, parentArea].every(v => Number.isFinite(v) && v > 0)) rangeError();
    const layout = (width, height, name) => {
      const footprintWidth = width + 2 * bleed, footprintHeight = height + 2 * bleed;
      if (![footprintWidth, footprintHeight].every(v => Number.isFinite(v) && v > 0)) rangeError();
      const across = Math.floor(uw / footprintWidth), down = Math.floor(uh / footprintHeight), total = across * down;
      if (![across, down, total].every(v => Number.isSafeInteger(v) && v >= 0)) rangeError();
      const allocated = total * footprintWidth * footprintHeight, trimArea = total * width * height;
      const unused = Math.max(0, parentArea - allocated), unusedPercent = unused / parentArea * 100, trimPercent = trimArea / parentArea * 100;
      if (![allocated, trimArea, unused, unusedPercent, trimPercent].every(Number.isFinite) || (total > 0 && (allocated <= 0 || trimArea <= 0))) rangeError();
      return { name, width, height, footprintWidth, footprintHeight, across, down, total, allocated, trimArea, unused, unusedPercent, trimPercent };
    };
    const normal = layout(fw, fh, 'Normal'), rotated = layout(fh, fw, 'Rotated');
    if (!normal.total && !rotated.total) throw Error('No item fits in the usable area after allowances.');
    return { pw, ph, bleed, grip, outer, uw, uh, parentArea, normal, rotated, best: normal.total >= rotated.total ? normal : rotated };
  };
  const format = value => value !== 0 && Math.abs(value) < 0.005 ? value.toExponential(2) : value.toLocaleString('en-US', { maximumFractionDigits: 2 });
  const preview = p => {
    const b = p.best, stroke = Math.min(p.pw, p.ph) / 700;
    let pieces = '';
    // This is a DOM-rendering budget, not an equipment or production limit.
    if (b.total <= 250) for (let index = 0; index < b.total; index++) {
      const x = p.outer + index % b.across * b.footprintWidth, y = p.outer + Math.floor(index / b.across) * b.footprintHeight;
      pieces += `<rect class="imposition-bleed" x="${x}" y="${y}" width="${b.footprintWidth}" height="${b.footprintHeight}" fill="#c6d0d6" stroke="#46545f" stroke-width="${stroke}"/><rect class="imposition-trim" x="${x + p.bleed}" y="${y + p.bleed}" width="${b.width}" height="${b.height}" fill="#d4fb36" stroke="#26323c" stroke-width="${stroke}"/>`;
    }
    return `<figure class="imposition-figure"><svg class="imposition-sheet" viewBox="0 0 ${p.pw} ${p.ph}" role="img" aria-labelledby="imposition-diagram-title" preserveAspectRatio="xMidYMid meet"><title id="imposition-diagram-title">${b.name} layout on the ${p.pw} by ${p.ph} parent sheet: ${b.across} across and ${b.down} down</title><rect width="${p.pw}" height="${p.ph}" fill="#aeb8bf"/><rect class="imposition-usable" x="${p.outer}" y="${p.outer}" width="${p.uw}" height="${p.uh}" fill="#fff"/>${p.grip > 0 ? `<rect class="imposition-gripper" x="${p.outer}" y="${p.ph - p.outer - p.grip}" width="${p.uw}" height="${p.grip}" fill="#ffd077"/>` : ''}${pieces}</svg><figcaption>Lime: finished trim. Blue-grey: bleed allocation. Grey: outer margins. Gold: additional gripper strip, illustrated at the bottom. White: unused usable area.${b.total > 250 ? ' Individual pieces are not drawn above 250 items; sheet and usable-area geometry remain scaled.' : ''} Schematic only, not an imposed artwork file.</figcaption></figure>`;
  };
  const render = p => {
    const b = p.best, row = l => `<tr><th scope="row">${l.name}</th> <td>${l.across} × ${l.down}</td> <td>${format(l.total)}</td> <td>${format(l.unusedPercent)}%</td></tr>`;
    return `<strong>${format(b.total)} items / sheet</strong><p>Suggested uniform layout: ${b.name}${p.normal.total === p.rotated.total ? ' (tie; normal retained)' : ''}. Usable area: ${format(p.uw)} × ${format(p.uh)} linear input units.</p><div class="imposition-comparison"><table><caption>Uniform orientation comparison</caption><thead><tr><th>Layout</th> <th>Across × down</th> <th>Items</th> <th>Unused parent %</th></tr></thead><tbody>${row(p.normal)}${row(p.rotated)}</tbody></table></div><dl data-area-breakdown><div><dt>Parent area</dt> <dd>${format(p.parentArea)} square input units</dd></div>\n<div><dt>Allocated bleed boxes</dt> <dd>${format(b.allocated)} square input units</dd></div>\n<div><dt>Unallocated parent area</dt> <dd>${format(b.unused)} square input units (${format(b.unusedPercent)}%)</dd></div>\n<div><dt>Finished trim area</dt> <dd>${format(b.trimArea)} square input units (${format(b.trimPercent)}%)</dd></div></dl><p class="imposition-area-note">Areas are mm² for mm inputs, or in² for inch inputs. Unallocated area includes margins, gripper and leftover strips; it is not spoilage sheets. Bleed boxes include material trimmed away; finished trim yield is lower when bleed is non-zero.</p><div id="preview">${preview(p)}</div>`;
  };
  globalThis.PPLImposition = { plan, render };
  if (typeof document === 'undefined') return;
  document.addEventListener('DOMContentLoaded', () => {
    const calculator = document.querySelector('.imposition-tool');
    if (!calculator) return;
    const margin = document.getElementById('g');
    if (margin) { const help = document.createElement('small'); help.textContent = 'Reserve this amount on all four edges, in addition to the gripper strip.'; margin.parentElement.append(help); }
    const original = window.run;
    window.run = type => {
      if (type !== 'imposition') return original(type);
      const result = document.getElementById('result');
      try {
        const fields = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map(id => document.getElementById(id));
        if (fields.some(field => !field || field.value.trim() === '')) throw Error('Complete every dimension and allowance. Enter 0 when an allowance is not required.');
        result.innerHTML = render(plan(fields.map(field => Number(field.value))));
      } catch (error) { result.replaceChildren(); const message = document.createElement('p'); message.className = 'error'; message.textContent = error.message; result.append(message); }
    };
  });
})();
