/**
* Calculate current coefficients based on drag values.
* Page 156 in [Fossen2011].
* @param {number} relativeAngle - Relative angle of the current.
* @param {object} drag          - The drag coefficients object.
* @param {number} frontalArea   - Projected frontal area under water.
* @param {number} lateralArea   - Projected lateral area under water.
* @param {number} loa           - The vessel's length over all.
* @returns {object}             - Current coefficients in surge, sway and yaw.
*/
export function dragBasedTrigonometric(relativeAngle, drag, frontalArea, lateralArea, loa) {
  const ρ = 1024.0; // kg/m^3
  const g = 9.81; // m/s^2

  const CX = -2 * (drag.surge / (ρ * frontalArea)) *
    Math.cos(relativeAngle) * Math.abs(Math.cos(relativeAngle))
    * (10 ** 3) * g;

  const CY = -2 * (drag.sway / (ρ * lateralArea)) *
    Math.sin(relativeAngle) * Math.abs(Math.sin(relativeAngle))
    * (10 ** 3) * g;

  const CN = 2 * (drag.yawSway / (ρ * lateralArea * loa)) *
    Math.sin(relativeAngle) * Math.abs(Math.sin(relativeAngle))
    * (10 ** 3) * g;

  return { CX, CY, CN };
}

/**
* Calculate current coefficients based on maxmimum values.
* Page 154 in [Fossen2011].
* @param {number} relativeAngle - Relative angle of the current.
* @param {object} max           - The drag coefficients object.
* @returns {object}             - Current coefficients in surge, sway and yaw.
*/
export function maxBasedTrigonometric(relativeAngle, max) {
  const CX = -max.surge * Math.cos(relativeAngle) * Math.abs(Math.cos(relativeAngle));
  const CY = -max.sway * Math.sin(relativeAngle) * Math.abs(Math.sin(relativeAngle));
  const CN = -max.yaw * Math.sin(2 * relativeAngle);

  return { CX, CY, CN };
}
