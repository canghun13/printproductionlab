(() => {
  const result = () => document.getElementById('result');
  const el = id => document.getElementById(id);
  const number = id => {
    const raw = String(el(id)?.value ?? '').trim();
    return raw === '' ? Number.NaN : Number(raw);
  };
  const text = id => String(el(id)?.value ?? '').trim();
  const positive = values => values.every(value => Number.isFinite(value) && value > 0);
  const nonNegative = values => values.every(value => Number.isFinite(value) && value >= 0);
  const fmt = (value, digits = 2) => Number(value.toFixed(digits)).toLocaleString(undefined, { maximumFractionDigits: digits });
  const error = message => { result().innerHTML = '<p class="error">' + message + '</p>'; };
  const bytes = value => new TextEncoder().encode(value).length;

  const partitions = {
    12: { partition: 0, companyBits: 40, itemBits: 4, itemDigits: 1 },
    11: { partition: 1, companyBits: 37, itemBits: 7, itemDigits: 2 },
    10: { partition: 2, companyBits: 34, itemBits: 10, itemDigits: 3 },
    9: { partition: 3, companyBits: 30, itemBits: 14, itemDigits: 4 },
    8: { partition: 4, companyBits: 27, itemBits: 17, itemDigits: 5 },
    7: { partition: 5, companyBits: 24, itemBits: 20, itemDigits: 6 },
    6: { partition: 6, companyBits: 20, itemBits: 24, itemDigits: 7 }
  };
  const byPartition = Object.fromEntries(Object.entries(partitions).map(([digits, row]) => [row.partition, { ...row, companyDigits: Number(digits) }]));

  const checkDigit = core => {
    let sum = 0;
    for (let index = 0; index < core.length; index += 1) sum += Number(core[core.length - 1 - index]) * (index % 2 === 0 ? 3 : 1);
    return String((10 - sum % 10) % 10);
  };

  const encodeSgtin = (gtin, companyDigits, serial, filter) => {
    if (!/^\d{14}$/.test(gtin) || checkDigit(gtin.slice(0, 13)) !== gtin[13]) throw new Error('Enter a valid 14-digit GTIN with its correct check digit.');
    const row = partitions[companyDigits];
    if (!row) throw new Error('GS1 Company Prefix length must be 6–12 digits.');
    if (!/^\d+$/.test(serial) || (serial.length > 1 && serial.startsWith('0'))) throw new Error('SGTIN-96 serials must be numeric with no leading zero.');
    const serialValue = BigInt(serial);
    if (serialValue > 274877906943n) throw new Error('SGTIN-96 serial must not exceed 274,877,906,943.');
    const core = gtin.slice(0, 13);
    const company = core.slice(1, 1 + companyDigits);
    const item = core[0] + core.slice(1 + companyDigits);
    const companyValue = BigInt(company);
    const itemValue = BigInt(item);
    if (companyValue >= 1n << BigInt(row.companyBits) || itemValue >= 1n << BigInt(row.itemBits)) throw new Error('GTIN fields do not fit the selected GS1 partition.');
    let value = 0x30n;
    value = (value << 3n) | BigInt(filter);
    value = (value << 3n) | BigInt(row.partition);
    value = (value << BigInt(row.companyBits)) | companyValue;
    value = (value << BigInt(row.itemBits)) | itemValue;
    value = (value << 38n) | serialValue;
    return {
      hex: value.toString(16).toUpperCase().padStart(24, '0'),
      tagUri: `urn:epc:tag:sgtin-96:${filter}.${company}.${item}.${serial}`,
      pureUri: `urn:epc:id:sgtin:${company}.${item}.${serial}`,
      partition: row.partition
    };
  };

  const decodeSgtin = hex => {
    const normalized = hex.replace(/^0x/i, '').replace(/\s+/g, '').toUpperCase();
    if (!/^[0-9A-F]{24}$/.test(normalized)) throw new Error('Enter exactly 24 hexadecimal characters for a 96-bit EPC.');
    let value = BigInt('0x' + normalized);
    const serial = value & ((1n << 38n) - 1n); value >>= 38n;
    const partition = Number((value >> 44n) & 0x7n);
    const row = byPartition[partition];
    if (!row) throw new Error('The EPC contains an unsupported SGTIN partition.');
    const item = value & ((1n << BigInt(row.itemBits)) - 1n); value >>= BigInt(row.itemBits);
    const company = value & ((1n << BigInt(row.companyBits)) - 1n); value >>= BigInt(row.companyBits);
    value >>= 3n;
    const filter = Number(value & 0x7n); value >>= 3n;
    const header = Number(value & 0xffn);
    if (header !== 0x30) throw new Error('EPC header is not SGTIN-96 (0x30).');
    const companyText = company.toString().padStart(row.companyDigits, '0');
    const itemText = item.toString().padStart(row.itemDigits, '0');
    const core = itemText[0] + companyText + itemText.slice(1);
    const gtin = core + checkDigit(core);
    return { hex: normalized, gtin, companyText, itemText, serial: serial.toString(), filter, partition };
  };

  const epc = () => {
    try {
      if (el('epc-mode').value === 'decode') {
        const decoded = decodeSgtin(text('epc-hex'));
        result().innerHTML = `<strong>GTIN ${decoded.gtin} · serial ${decoded.serial}</strong><p>${decoded.hex} decodes as SGTIN-96 partition ${decoded.partition}, filter ${decoded.filter}, GS1 Company Prefix ${decoded.companyText}, item reference ${decoded.itemText} and serial ${decoded.serial}. Confirm the identity against the commissioned barcode/data record before release.</p>`;
        return;
      }
      const encoded = encodeSgtin(text('gtin'), number('company-prefix-digits'), text('serial'), number('filter-value'));
      result().innerHTML = `<strong>${encoded.hex}</strong><p>${encoded.tagUri}<br>${encoded.pureUri}<br>Partition ${encoded.partition}; 96 bits. Read the encoded tag back and compare all fields before the production run.</p>`;
    } catch (problem) { error(problem.message); }
  };

  const uriPrefixes = [
    ['https://www.', 2], ['http://www.', 1], ['https://', 4], ['http://', 3], ['mailto:', 6], ['tel:', 5], ['', 0]
  ];
  const ndef = () => {
    const kind = el('ndef-kind').value;
    const content = text('ndef-content');
    const capacity = number('tag-capacity');
    const language = text('ndef-language').toLowerCase();
    if (!content || !positive([capacity]) || !Number.isInteger(capacity)) return error('Enter content and a positive whole-number tag capacity in bytes.');
    let payloadBytes;
    let detail;
    if (kind === 'uri') {
      const match = uriPrefixes.find(([prefix]) => prefix && content.toLowerCase().startsWith(prefix)) || uriPrefixes[uriPrefixes.length - 1];
      payloadBytes = 1 + bytes(content.slice(match[0].length));
      detail = `URI prefix code 0x${match[1].toString(16).padStart(2, '0')} plus ${payloadBytes - 1} UTF-8 content bytes`;
    } else {
      if (!/^[a-z]{2,8}(-[a-z0-9]{2,8})?$/.test(language)) return error('Use a short BCP 47-style language code such as en or en-US.');
      payloadBytes = 1 + bytes(language) + bytes(content);
      detail = `status byte, ${bytes(language)} language bytes and ${bytes(content)} UTF-8 text bytes`;
    }
    const shortRecord = payloadBytes <= 255;
    const recordBytes = 1 + 1 + (shortRecord ? 1 : 4) + 1 + payloadBytes;
    const tlvLengthBytes = recordBytes <= 254 ? 1 : 3;
    const total = 1 + tlvLengthBytes + recordBytes + 1;
    const remaining = capacity - total;
    const status = remaining >= 0 ? `${remaining} bytes remain` : `${Math.abs(remaining)} bytes over capacity`;
    result().innerHTML = `<strong>${total} bytes required · ${status}</strong><p>The ${kind.toUpperCase()} NDEF record uses ${recordBytes} bytes (${detail}); the Type 2 NDEF TLV length/terminator adds ${1 + tlvLengthBytes + 1} bytes. ${remaining >= 0 ? 'The message fits the entered usable data area.' : 'Shorten the payload or select a tag with more usable NDEF memory.'}</p>`;
  };

  const pitch = () => {
    const labelPitch = number('label-pitch');
    const inlayPitch = number('inlay-pitch');
    const start = number('start-offset');
    const tolerance = number('alignment-window');
    const count = number('run-labels');
    if (!positive([labelPitch, inlayPitch, tolerance, count]) || !Number.isInteger(count) || count > 1000000 || !Number.isFinite(start)) return error('Enter positive pitches/tolerance, a finite start offset and 1–1,000,000 whole labels.');
    const delta = inlayPitch - labelPitch;
    let firstFailure = null;
    for (let index = 1; index <= count; index += 1) {
      if (Math.abs(start + (index - 1) * delta) > tolerance) { firstFailure = index; break; }
    }
    const end = start + (count - 1) * delta;
    const verdict = firstFailure ? `first out-of-window label: ${firstFailure.toLocaleString()}` : `all ${count.toLocaleString()} labels remain in window`;
    result().innerHTML = `<strong>${fmt(delta, 4)} mm drift per repeat · ${verdict}</strong><p>Offset moves from ${fmt(start, 3)} mm at label 1 to ${fmt(end, 3)} mm at label ${count.toLocaleString()}, against a ±${fmt(tolerance, 3)} mm alignment window. A non-zero pitch difference accumulates; verify actual inlay pitch and phase on the supplied roll.</p>`;
  };

  const position = () => {
    const positionMm = number('inlay-position');
    const dpi = number('printer-dpi');
    const labelPitch = number('position-label-pitch');
    if (!nonNegative([positionMm]) || !positive([dpi, labelPitch]) || positionMm > labelPitch) return error('Enter a non-negative inlay position within a positive label pitch and a positive printer resolution.');
    const exactDots = positionMm / 25.4 * dpi;
    const dots = Math.round(exactDots);
    const roundedMm = dots / dpi * 25.4;
    const errorMm = roundedMm - positionMm;
    result().innerHTML = `<strong>${dots.toLocaleString()} dots · ${fmt(positionMm / 25.4, 4)} in</strong><p>${fmt(positionMm, 3)} mm from the leading-edge reference equals ${fmt(exactDots, 3)} dots at ${fmt(dpi, 0)} dpi; the nearest whole-dot command represents ${fmt(roundedMm, 3)} mm (${errorMm >= 0 ? '+' : ''}${fmt(errorMm, 4)} mm rounding). Position is ${fmt(positionMm / labelPitch * 100, 1)}% through the label pitch. Confirm the printer's origin and forward/backfeed convention in its RFID manual.</p>`;
  };

  const throughput = () => {
    const good = number('good-labels');
    const speed = number('encode-speed');
    const firstPass = number('first-pass-yield') / 100;
    const retrySuccess = number('retry-success') / 100;
    const retryDelay = number('retry-delay');
    const attempts = number('max-attempts');
    if (!positive([good, speed, firstPass, attempts]) || !nonNegative([retrySuccess, retryDelay]) || firstPass > 1 || retrySuccess > 1 || !Number.isInteger(good) || !Number.isInteger(attempts) || attempts > 10) return error('Use whole positive quantities/attempts, rates from 0–100%, positive speed and non-negative retry delay.');
    const finalYield = 1 - (1 - firstPass) * Math.pow(1 - retrySuccess, attempts - 1);
    const gross = Math.ceil(good / finalYield);
    let extraAttempts = 0;
    for (let attempt = 2; attempt <= attempts; attempt += 1) extraAttempts += (1 - firstPass) * Math.pow(1 - retrySuccess, attempt - 2);
    const retryCount = gross * extraAttempts;
    const totalAttempts = gross + retryCount;
    const minutes = totalAttempts / speed + retryCount * retryDelay / 60;
    const expectedVoid = gross * (1 - finalYield);
    result().innerHTML = `<strong>Start ${gross.toLocaleString()} tags · ${fmt(minutes, 1)} min expected</strong><p>With ${fmt(finalYield * 100, 2)}% eventual encode yield across up to ${attempts} attempt(s), plan ${fmt(totalAttempts, 1)} encode attempts, about ${fmt(retryCount, 1)} retries and ${fmt(expectedVoid, 1)} final void/reject tags to release ${good.toLocaleString()} good labels. Use measured yield and retry timing from the actual printer/inlay combination.</p>`;
  };

  const actions = { epc, ndef, pitch, position, throughput };
  window.runSmartLabel = name => actions[name]?.();

  document.addEventListener('click', event => {
    if (!event.target.matches('[data-reset]') || !event.target.closest('.smart-label-tool')) return;
    event.target.closest('.smart-label-tool').querySelectorAll('select').forEach(select => {
      const option = [...select.options].find(item => item.defaultSelected) || select.options[0];
      if (option) select.value = option.value;
    });
  });
})();
