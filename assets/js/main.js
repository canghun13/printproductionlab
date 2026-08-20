const copyText = async text => {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const fallback = document.createElement('textarea');
  fallback.value = text;
  fallback.setAttribute('readonly', '');
  fallback.style.position = 'fixed';
  fallback.style.opacity = '0';
  document.body.append(fallback);
  fallback.select();
  const copied = document.execCommand('copy');
  fallback.remove();
  if (!copied) throw new Error('Clipboard unavailable');
};

const setupCopyResult = calculator => {
  const result = calculator.querySelector('.result');
  if (!result || calculator.dataset.copyResultReady) return;
  calculator.dataset.copyResultReady = 'true';
  result.querySelectorAll('[data-copy]').forEach(button => button.remove());
  result.dataset.resetContent = result.innerHTML || 'Enter values to calculate.';

  const actions = document.createElement('div');
  actions.className = 'result-actions';
  actions.hidden = true;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'copy';
  button.dataset.copy = '';
  button.textContent = 'Copy result';
  button.setAttribute('aria-label', 'Copy calculation result');
  actions.append(button);

  const hideCopy = () => {
    actions.hidden = true;
    button.tabIndex = -1;
    button.textContent = 'Copy result';
    delete button.dataset.copyValue;
  };
  const updateCopy = () => {
    const valid = !result.querySelector('.error') && Boolean(result.querySelector('strong'));
    if (!valid) return hideCopy();
    const heading = calculator.closest('main')?.querySelector('h1')?.textContent.trim() || 'Calculation result';
    const visibleResult = [...result.childNodes]
      .filter(node => node !== actions)
      .map(node => node.textContent.trim())
      .filter(Boolean)
      .join('\n');
    if (!visibleResult) return hideCopy();
    button.dataset.copyValue = `${heading}\nResult: ${visibleResult}`;
    if (!result.contains(actions)) result.append(actions);
    actions.hidden = false;
    button.tabIndex = 0;
  };

  button.addEventListener('click', async () => {
    try {
      await copyText(button.dataset.copyValue || '');
      button.textContent = 'Copied';
      setTimeout(() => {
        if (!actions.hidden) button.textContent = 'Copy result';
      }, 1200);
    } catch {
      button.textContent = 'Copy failed';
      setTimeout(() => {
        if (!actions.hidden) button.textContent = 'Copy result';
      }, 1800);
    }
  });
  new MutationObserver(updateCopy).observe(result, { childList: true, characterData: true, subtree: true });
  updateCopy();
};

document.addEventListener('click', event => {
  if (!event.target.matches('[data-reset]')) return;
  const calculator = event.target.closest('.calculator');
  const result = calculator?.querySelector('.result');
  calculator?.querySelectorAll('input,select,textarea').forEach(field => { field.value = field.defaultValue; });
  if (result) result.innerHTML = result.dataset.resetContent || 'Enter values to calculate.';
  calculator?.querySelector('.preview')?.replaceChildren();
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.site-header .bar nav').forEach((nav, index) => {
    if (nav.previousElementSibling?.matches('.nav-toggle')) return;
    nav.id = nav.id || `primary-menu-${index + 1}`;
    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-controls', nav.id);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
    nav.before(toggle);
  });

  document.querySelectorAll('.calculator').forEach(calculator => {
    const calculate = calculator.querySelector('button:not([data-copy]):not([data-reset])');
    if (calculate && !calculator.querySelector('[data-reset]')) {
      const reset = document.createElement('button');
      reset.type = 'button';
      reset.className = 'reset';
      reset.dataset.reset = '';
      reset.textContent = 'Reset';
      calculate.after(reset);
    }
    setupCopyResult(calculator);
  });

  const button = document.querySelector("button[onclick=\"run('imposition')\"]");
  if (!button) return;
  const fields = button.closest('.panel').querySelector('.fields');
  const margin = document.createElement('label');
  margin.innerHTML = 'Outer margin (all four edges)<input id="g" type="number" value="10" min="0" step="any">';
  fields.append(margin);
  const original = window.run;
  window.run = type => {
    if (type !== 'imposition') return original(type);
    const value = id => Number(document.getElementById(id).value);
    const [pw, ph, bleed, fw, fh, grip, outer] = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map(value);
    if (![pw, ph, fw, fh].every(item => Number.isFinite(item) && item > 0) || ![bleed, grip, outer].every(item => Number.isFinite(item) && item >= 0)) {
      document.getElementById('result').innerHTML = '<p class="error">Enter positive dimensions and non-negative bleed, margin, and gripper allowances.</p>';
      return;
    }
    const calculate = (width, height, itemWidth, itemHeight) => {
      const usableWidth = width - 2 * outer, usableHeight = height - 2 * outer - grip;
      const widthWithBleed = itemWidth + 2 * bleed, heightWithBleed = itemHeight + 2 * bleed;
      if (usableWidth <= 0 || usableHeight <= 0) return null;
      const across = Math.floor(usableWidth / widthWithBleed), down = Math.floor(usableHeight / heightWithBleed);
      return { across, down, total: across * down, used: across * down * widthWithBleed * heightWithBleed, usableWidth, usableHeight };
    };
    const normal = calculate(pw, ph, fw, fh), rotated = calculate(pw, ph, fh, fw);
    if (!normal || !rotated || (!normal.total && !rotated.total)) {
      document.getElementById('result').innerHTML = '<p class="error">No item fits in the usable area after allowances.</p>';
      return;
    }
    const best = normal.total >= rotated.total ? normal : rotated;
    const preview = document.getElementById('preview');
    if (preview) preview.innerHTML = Array.from({ length: best.total }, (_, index) => `<i class="tile" style="left:${index % best.across * 100 / best.across}%;top:${Math.floor(index / best.across) * 100 / best.down}%;width:${100 / best.across}%;height:${100 / best.down}%"></i>`).join('');
    const result = document.getElementById('result');
    result.innerHTML = `<strong>${best.total} items / sheet</strong><p>Normal: ${normal.across} × ${normal.down} = ${normal.total}; rotated: ${rotated.across} × ${rotated.down} = ${rotated.total}. Usable area: ${best.usableWidth.toFixed(2)} × ${best.usableHeight.toFixed(2)}.</p>`;
    if (preview) result.append(preview);
  };
});
