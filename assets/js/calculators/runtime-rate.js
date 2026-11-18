/* This page only: the count basis must match the entered running rate. */
(() => {
  const plan = (a, b, c, unit = 'hour') => {
    if (![a,b,c].every(v => typeof v === 'number' && Number.isFinite(v) && v > 0)) throw Error('Enter positive impressions, sustainable speed and passes.');
    if (!Number.isInteger(c)) throw Error('Sequential passes must be a whole number of 1 or more.');
    if (!['hour','minute'].includes(unit)) throw Error('Choose impressions per hour or per minute.');
    const perPass = (a / b) / (unit === 'minute' ? 60 : 1);
    const total = perPass * c, totalImpressions = a * c;
    if (![perPass,total,totalImpressions].every(v => Number.isFinite(v) && v > 0)) throw Error('These inputs do not produce a usable press-time estimate.');
    return {perPass,total,totalImpressions,passes:c,speed:b,unit};
  };
  const duration = (hours, qualifier = '') => {
    const rounded = hours.toFixed(2);
    if (rounded !== '0.00') return `${rounded} ${qualifier}hours`;
    const seconds = (hours * 3600).toFixed(2);
    return seconds === '0.00' ? `less than 0.01 ${qualifier}seconds` : `${seconds} ${qualifier}seconds`;
  };
  const numeric = n => n < 0.005 || n >= 1e21 ? n.toExponential(2) : n.toFixed(2);
  const minutes = h => Number.isFinite(h * 60) ? `${numeric(h * 60)} minutes` : 'minutes outside numerical display range';
  const render = p => {
    const impressions = p.totalImpressions < 0.001 || p.totalImpressions >= 1e21 ? p.totalImpressions.toExponential(2) : p.totalImpressions.toLocaleString();
    return `<strong>${duration(p.total,'press ')}</strong><p>${impressions} total press impressions across ${p.passes} ${p.passes === 1 ? 'pass' : 'passes'} · ${duration(p.perPass)} per pass. Makeready, wash-up, drying and downtime are not included.</p><p data-runtime-rate-summary>Net running time: ${minutes(p.total)} · ${minutes(p.perPass)} per pass. Entered rate: ${numeric(p.speed)} impressions/${p.unit}.</p>`;
  };
  window.PPLRuntimeRate = {plan,render};
  document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('.runtime-tool'), unit = document.getElementById('runtime-speed-unit');
    if (!app || !unit) return;
    const result = app.querySelector('.result'), speed = document.getElementById('b');
    const syncLabel = () => { speed.closest('label').firstChild.textContent = `Sustainable press speed (impressions/${unit.value === 'minute' ? 'minute' : 'hour'})`; };
    const original = window.run2;
    window.run2 = type => {
      if (type !== 'runtime') return original(type);
      try { result.innerHTML = render(plan(...['a','b','c'].map(id => Number(document.getElementById(id).value)),unit.value)); }
      catch (error) { result.replaceChildren(); const message = document.createElement('p'); message.className = 'error'; message.textContent = error.message; result.append(message); }
    };
    unit.addEventListener('change', () => { syncLabel(); result.innerHTML = result.dataset.resetContent; });
    document.addEventListener('click', event => { if (event.target.matches('[data-reset]') && event.target.closest('.runtime-tool')) syncLabel(); });
    syncLabel();
  });
})();
