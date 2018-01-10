import GeneralUtil from '../../util/general.util';

/**
* Calculate the displacement of a vessel.
* @param {object} dimensions       - Object containing:
* @param {number} lpp              - Length between perpendiculars.
* @param {number} breadth          - Breadth.
* @param {number} draft            - Draft.
* @param {number} blockCoefficient - The block coefficient.
* @returns {number}                - The vessel's displacement in metric tons.
*/
function calculateDisplacement(dimensions) {
  const {
    lpp, breadth, draft, blockCoefficient,
  } = dimensions;
  const ρWater = 1.024;

  let displacement = ρWater * blockCoefficient * lpp * breadth * draft;
  displacement = GeneralUtil.truncToDecimal(displacement, 2);

  return displacement;
}

/**
* Calculate the mass (displacement + added mass) of a vessel in surge, sway and yaw.
* @param {number} displacement     - The vessel's displacement.
* @param {number} lpp              - Length between perpendiculars.
* @returns {object}                - An object containing the vessel's mass.
*                                  - fields: surge, sway, yaw.
*/
function calculateMass(displacement, lpp) {
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
function calculateDrag(lpp, breadth, draft) {
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
function calculateFrontalWindArea(breadth, superstructureHeight) {
  const areaCoefficient = 0.8;
  const frontalArea = areaCoefficient * breadth * superstructureHeight;

  return GeneralUtil.truncToDecimal(frontalArea, 2);
}

/**
* Calculate projected lateral wind area. A simple multiplication of
* loa and superstructure height, multiplied by an experience coefficient.
* @param {number} loa                   - The vessel's length over all.
* @param {number} superstructureHeight  - The height of the vessel's superstructure.
* @returns {number}                     - The projected lateral area.
*/
function calculateLateralWindArea(loa, superstructureHeight) {
  const areaCoefficient = 0.4;
  const lateralArea = areaCoefficient * loa * superstructureHeight;

  return GeneralUtil.truncToDecimal(lateralArea, 2);
}

/**
* Modify the vessel model given it's initial state and the initial vessel
* parameters from Vessel.json.
* @param {object} vesselModelInitialState  - The initial state object for the vessel.
* @param {object} initialVessel            - The initial vessel parameters from Vessel.json.
* @returns {object}                        - The modified vessel initial state object.
*/
function VesselModel(vesselModelInitialState, initialVessel) {
  vesselModelInitialState.dimensions = initialVessel.dimensions;
  vesselModelInitialState.model.position = initialVessel.model.position;

  vesselModelInitialState.dimensions.displacement =
    calculateDisplacement(vesselModelInitialState.dimensions);

  const {
    lpp, breadth, draft, displacement,
  } = vesselModelInitialState.dimensions;
  const { wind } = initialVessel;

  vesselModelInitialState.mass = calculateMass(displacement, lpp);
  vesselModelInitialState.drag = calculateDrag(lpp, breadth, draft);

  // Set optional parameters.
  if (!initialVessel.dimensions.loa) {
    vesselModelInitialState.dimensions.loa = 1.08 * lpp;
  }
  if (!wind || (wind && !wind.superStructureHeight)) {
    const hbExperienceRatio = 0.85; // height / breath
    vesselModelInitialState.wind.superStructureHeight =
      hbExperienceRatio * vesselModelInitialState.dimensions.breadth;
  }
  if (!wind || (wind && !wind.frontalArea)) {
    vesselModelInitialState.wind.frontalArea = calculateFrontalWindArea(
      breadth,
      vesselModelInitialState.wind.superStructureHeight,
    );
  }
  if (!wind || (wind && !wind.lateralArea)) {
    vesselModelInitialState.wind.lateralArea = calculateLateralWindArea(
      vesselModelInitialState.dimensions.loa,
      vesselModelInitialState.wind.superStructureHeight,
    );
  }
  if (!wind || (wind && !wind.vesselType)) {
    vesselModelInitialState.wind.vesselType = 'Offshore supply vessel';
  }
  if (!wind || (wind && !wind.coefficientCalcType)) {
    vesselModelInitialState.wind.coefficientCalcType = 'blendermann';
  }
  if (!wind || (wind && !wind.sL)) {
    const experienceRatio = 0.20;
    vesselModelInitialState.wind.sL = experienceRatio * lpp;
  }

  return vesselModelInitialState;
}

export default VesselModel;
