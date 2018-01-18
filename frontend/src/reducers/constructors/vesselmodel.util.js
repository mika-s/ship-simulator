import { truncToDecimal } from '../../util/general.util';

/**
* Calculate the displacement of a vessel.
* @param {object} dimensions       - Object containing:
* @param {number} lpp              - Length between perpendiculars.
* @param {number} breadth          - Breadth.
* @param {number} draft            - Draft.
* @param {number} blockCoefficient - The block coefficient.
* @returns {number}                - The vessel's displacement in metric tons.
*/
export function calculateDisplacement(dimensions) {
  const {
    lpp, breadth, draft, blockCoefficient,
  } = dimensions;
  const ρWater = 1.024;

  let displacement = ρWater * blockCoefficient * lpp * breadth * draft;
  displacement = truncToDecimal(displacement, 2);

  return displacement;
}

/**
* Calculate the mass (displacement + added mass) of a vessel in surge, sway and yaw.
* @param {number} displacement     - The vessel's displacement.
* @param {number} lpp              - Length between perpendiculars.
* @returns {object}                - An object containing the vessel's mass.
*                                  - fields: surge, sway, yaw.
*/
export function calculateMass(displacement, lpp) {
  // const r66 = (1 / 4) * lpp;

  const mass = {
    surge: 1.2 * displacement,
    sway: 1.8 * displacement,
    // yaw: 0.5 * displacement * (r66 ** 2),
    yaw: displacement * ((lpp / 3) ** 2),
  };

  return mass;
}

/**
* Calculate the drag of a vessel in surge, sway and yaw.
* @param {number} lpp       - Length between perpendiculars.
* @param {number} breadth   - Breadth.
* @param {number} draft     - Draft.
* @returns {object}         - An object containing the vessel's drag.
*                           - fields: surge, sway, yaw.
*/
export function calculateDrag(lpp, breadth, draft) {
  const dragSurge = 0.05 * breadth * draft;
  const dragSway = 0.075 * lpp * draft;
  const dragYaw = (dragSway / (4 * lpp)) * (((lpp / 2.0) ** 4) + ((lpp / 2.0) ** 4));
  const dragYawSway = -0.005 * dragYaw * 0; // TODO: find a suitable value.

  const expValues = {
    surge: 0.6, sway: 0.8, yaw: 0.6, yawSway: 1.0,
  };

  const drag = {
    surge: expValues.surge * dragSurge,
    sway: expValues.sway * dragSway,
    yaw: expValues.yaw * dragYaw,
    yawSway: expValues.yawSway * dragYawSway,
  };

  return drag;
}

/**
* Calculate projected frontal wind area. A simple multiplication of
* breadth and superstructure height, multiplied by an experience coefficient.
* @param {number} breadth               - The vessel's breadth.
* @param {number} superstructureHeight  - The height of the vessel's superstructure.
* @returns {number}                     - The projected frontal area.
*/
export function calculateFrontalWindArea(breadth, superstructureHeight) {
  const areaCoefficient = 0.8;
  const frontalArea = areaCoefficient * breadth * superstructureHeight;

  return truncToDecimal(frontalArea, 2);
}

/**
* Calculate projected lateral wind area. A simple multiplication of
* loa and superstructure height, multiplied by an experience coefficient.
* @param {number} loa                   - The vessel's length over all.
* @param {number} superstructureHeight  - The height of the vessel's superstructure.
* @returns {number}                     - The projected lateral area.
*/
export function calculateLateralWindArea(loa, superstructureHeight) {
  const areaCoefficient = 0.4;
  const lateralArea = areaCoefficient * loa * superstructureHeight;

  return truncToDecimal(lateralArea, 2);
}
