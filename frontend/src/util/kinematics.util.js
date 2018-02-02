const {
  PI, abs, sign, sin, cos, trunc,
} = Math;

/**
* Transform from NED to BODY. I.e. latitude, longitude, heading to surge, sway, heading.
* @param {Object} bodyPostion   - Object containing latitude, longitude, heading (rad).
* @returns {Object} Object containing surge, sway, heading.
*/
export function transformNEDToBODY(nedPosition) {
  const { latitude, longitude, heading } = nedPosition;

  const surge = (cos(heading) * latitude) + (sin(heading) * longitude);
  const sway = -(sin(heading) * latitude) + (cos(heading) * longitude);

  return { surge, sway, heading };
}

/**
* Transform from BODY to NED. I.e. surge, sway, heading to latitude, longitude, heading.
* @param {Object} bodyPostion   - Object containing surge (m), sway (m), heading (rad).
* @returns {Object} Object containing latitude, longitude, heading.
*/
export function transformBODYToNED(bodyPostion) {
  const { surge, sway, heading } = bodyPostion;

  const latitude = (cos(heading) * surge) - (sin(heading) * sway);
  const longitude = (sin(heading) * surge) + (cos(heading) * sway);

  return { latitude, longitude, heading };
}

/**
* Wrap an angle in the range -∞,∞ to 0,360°.
* @param {number} angle     - The angle to wrap.
* @returns {number} The wrapped angle.
*/
export function wrapTo0To360(angle) {
  return (angle % 360) + (angle < 0 ? 360 : 0);
}

/**
* Wrap an angle in the range -∞,∞ to 0,2π.
* @param {number} angle     - The angle to wrap.
* @returns {number} The wrapped angle.
*/
export function wrapTo0To2pi(angle) {
  return (angle % (2 * PI)) + (angle < 0 ? (2 * PI) : 0);
}

/**
* Wrap an angle in the range -∞,∞ to -π to π.
* @param {number} angle     - The angle to wrap.
* @returns {Object} An object containing the wrapped angle and number of revolutions.
*/
export function wrapToPipi(angle) {
  const revolutions = trunc((angle + (sign(angle) * PI)) / (2 * PI));

  const part1 = (angle + (sign(angle) * PI)) % (2 * PI);
  const part21 = 2 * (sign(abs(((angle + PI) % (2 * PI)) / (2 * PI))) - 1);
  const part2 = (sign(sign(angle) + part21)) * PI;

  const outputAngle = part1 - part2;

  return { angle: outputAngle, revolutions };
}

/**
* Unwrap the angle
* @param {number} previousAngle   - The previous angle.
* @param {number} newAngle        - The new angle.
* @returns {Object} The angle unwrapped.
*/
export function unwrapAngle(previousAngle, newAngle) {
  let difference = newAngle - previousAngle;

  if (difference > PI) difference -= 2 * PI;
  else if (difference < -PI) difference += 2 * PI;

  return previousAngle + difference;
}
