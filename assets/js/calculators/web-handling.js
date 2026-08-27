(() => {
  const result = () => document.getElementById('result');
  const number = id => Number(document.getElementById(id)?.value);
  const positive = values => values.every(value => Number.isFinite(value) && value > 0);
  const nonNegative = values => values.every(value => Number.isFinite(value) && value >= 0);
  const fmt = (value, digits = 2) => Number(value.toFixed(digits)).toLocaleString(undefined, { maximumFractionDigits: digits });
  const error = message => { result().innerHTML = '<p class="error">' + message + '</p>'; };
  const N_PER_LBF = 4.4482216153;

  const tensionForce = () => {
    const widthMm = number('web-width');
    const tensionValue = number('tension-per-width');
    const unit = document.getElementById('tension-unit').value;
    if (!positive([widthMm, tensionValue])) return error('Enter a web width and tension-per-width value greater than zero.');
    let totalN;
    if (unit === 'n-mm') totalN = widthMm * tensionValue;
    else if (unit === 'n-m') totalN = widthMm / 1000 * tensionValue;
    else totalN = widthMm / 25.4 * tensionValue * N_PER_LBF;
    result().innerHTML = '<strong>' + fmt(totalN, 2) + ' N total web tension</strong><p>Across ' + fmt(widthMm, 2) + ' mm, the specified unit tension produces ' + fmt(totalN / N_PER_LBF, 2) + ' lbf total force. Use total force—not tension per unit width—when checking a load-cell range or calculating roll torque.</p>';
  };

  const windingTorque = () => {
    const tensionN = number('total-tension');
    const diameterMm = number('roll-diameter');
    const efficiency = number('drive-efficiency');
    if (!positive([tensionN, diameterMm, efficiency]) || efficiency > 100) return error('Enter positive tension and diameter values and an efficiency from greater than 0 to 100%.');
    const rollTorque = tensionN * diameterMm / 2000;
    const driveTorque = rollTorque / (efficiency / 100);
    result().innerHTML = '<strong>' + fmt(rollTorque, 2) + ' N·m at the roll</strong><p>Tension torque = force × radius. At ' + fmt(diameterMm, 1) + ' mm diameter, ' + fmt(tensionN, 1) + ' N requires ' + fmt(rollTorque, 2) + ' N·m at the roll and ' + fmt(driveTorque, 2) + ' N·m before a ' + fmt(efficiency, 1) + '% efficient drive path. Acceleration and friction torque are not included.</p>';
  };

  const taperTension = () => {
    const core = number('core-diameter');
    const full = number('full-diameter');
    const current = number('current-diameter');
    const startTension = number('start-tension');
    const taper = number('taper-percent');
    if (!positive([core, full, current, startTension]) || !nonNegative([taper]) || taper > 100 || full <= core || current < core || current > full) return error('Use positive diameters with core < current ≤ full and a taper from 0 to 100%.');
    const build = (current - core) / (full - core);
    const target = startTension * (1 - taper / 100 * build);
    const torque = target * current / 2000;
    result().innerHTML = '<strong>' + fmt(target, 2) + ' N target tension</strong><p>The roll is ' + fmt(build * 100, 1) + '% through its diameter build. A linear ' + fmt(taper, 1) + '% taper reduces the core tension from ' + fmt(startTension, 1) + ' N to ' + fmt(target, 2) + ' N here; roll torque is ' + fmt(torque, 2) + ' N·m. Confirm how the actual controller defines taper before transferring this setpoint.</p>';
  };

  const dancerPressure = () => {
    const tension = number('dancer-tension');
    const spans = number('web-spans');
    const arm = number('web-arm');
    const cylinderArm = number('cylinder-arm');
    const bore = number('cylinder-bore');
    const rod = number('rod-diameter');
    const cylinders = number('cylinder-count');
    if (!positive([tension, spans, arm, cylinderArm, bore, cylinders]) || !nonNegative([rod]) || rod >= bore || !Number.isInteger(spans) || !Number.isInteger(cylinders)) return error('Enter positive geometry, whole-number spans/cylinders, and a rod diameter smaller than the bore.');
    const webForce = tension * spans;
    const cylinderForce = webForce * arm / cylinderArm;
    const areaMm2 = Math.PI / 4 * (bore * bore - rod * rod) * cylinders;
    const pressureKpa = cylinderForce / areaMm2 * 1000;
    result().innerHTML = '<strong>' + fmt(pressureKpa, 1) + ' kPa cylinder pressure</strong><p>' + fmt(tension, 1) + ' N across ' + spans + ' web spans creates ' + fmt(webForce, 1) + ' N at the dancer roller. The lever requires ' + fmt(cylinderForce, 1) + ' N from ' + cylinders + ' cylinder(s), equal to ' + fmt(pressureKpa / 100, 2) + ' bar or ' + fmt(pressureKpa * 0.1450377, 1) + ' psi. Gravity, seal friction and dancer acceleration are excluded.</p>';
  };

  const accelerationTorque = () => {
    const mass = number('roll-mass');
    const od = number('accel-roll-diameter');
    const core = number('accel-core-diameter');
    const speed = number('line-speed');
    const seconds = number('accel-time');
    const tension = number('accel-tension');
    const efficiency = number('accel-efficiency');
    if (!positive([mass, od, core, speed, seconds, tension, efficiency]) || core >= od || efficiency > 100) return error('Enter positive values, a core smaller than the roll diameter, and efficiency from greater than 0 to 100%.');
    const radius = od / 2000;
    const coreRadius = core / 2000;
    const velocity = speed / 60;
    const omega = velocity / radius;
    const alpha = omega / seconds;
    const inertia = 0.5 * mass * (radius * radius + coreRadius * coreRadius);
    const accelTorque = inertia * alpha;
    const tensionTorque = tension * radius;
    const total = accelTorque + tensionTorque;
    const drive = total / (efficiency / 100);
    result().innerHTML = '<strong>' + fmt(drive, 2) + ' N·m drive torque</strong><p>At the stated roll, inertia is ' + fmt(inertia, 2) + ' kg·m². Acceleration adds ' + fmt(accelTorque, 2) + ' N·m to ' + fmt(tensionTorque, 2) + ' N·m tension torque, for ' + fmt(total, 2) + ' N·m at the roll and ' + fmt(drive, 2) + ' N·m before a ' + fmt(efficiency, 1) + '% efficient drive path.</p>';
  };

  const actions = { tensionForce, windingTorque, taperTension, dancerPressure, accelerationTorque };
  window.runWebHandling = name => actions[name]?.();
})();
