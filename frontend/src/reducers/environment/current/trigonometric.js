const { sin, cos, abs } = Math;

/**
* Calculate current coefficients based on drag values.
* Page 156 in [Fossen2011].
* @param {number} relativeAngle Relative angle of the current.
* @param {Object} drag          The drag coefficients object.
* @param {number} frontalArea   Projected frontal area under water.
* @param {number} lateralArea   Projected lateral area under water.
* @param {number} loa           The vessel's length over all.
* @returns {Object} Current coefficients in surge, sway and yaw.
*/
export function dragBasedTrigonometric(relativeAngle, drag, frontalArea, lateralArea, loa) {
  const ρ = 1024.0; // kg/m^3
  const g = 9.81; // m/s^2

  const CX = -2 * (drag.surge / (ρ * frontalArea)) *
    cos(relativeAngle) * abs(cos(relativeAngle))
    * (10 ** 3) * g;

  const CY = -2 * (drag.sway / (ρ * lateralArea)) *
    sin(relativeAngle) * abs(sin(relativeAngle))
    * (10 ** 3) * g;

  const CN = 2 * (drag.yawSway / (ρ * lateralArea * loa)) *
    sin(relativeAngle) * abs(sin(relativeAngle))
    * (10 ** 3) * g;

  return { CX, CY, CN };
}

/**
* Calculate current coefficients based on maxmimum values.
* Page 154 in [Fossen2011].
* @param {number} relativeAngle Relative angle of the current.
* @param {Object} max           The drag coefficients object.
* @returns {Object} Current coefficients in surge, sway and yaw.
*/
export function maxBasedTrigonometric(relativeAngle, max) {
  const CX = -max.surge * cos(relativeAngle) * abs(cos(relativeAngle));
  const CY = -max.sway * sin(relativeAngle) * abs(sin(relativeAngle));
  const CN = -max.yaw * sin(2 * relativeAngle);

  return { CX, CY, CN };
}
