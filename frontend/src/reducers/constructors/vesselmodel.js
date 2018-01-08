import VesselUtil from '../vesselmodel/vessel.util';

function VesselModel(vesselModelInitialState, initialVessel) {
  vesselModelInitialState.dimensions = initialVessel.dimensions;
  vesselModelInitialState.model.position = initialVessel.model.position;

  vesselModelInitialState.dimensions.displacement =
    VesselUtil.calculateDisplacement(vesselModelInitialState.dimensions);

  const {
    lpp, breadth, draft, displacement,
  } = vesselModelInitialState.dimensions;
  const { wind } = initialVessel;

  vesselModelInitialState.mass = VesselUtil.calculateMass(displacement, lpp);
  vesselModelInitialState.drag = VesselUtil.calculateDrag(lpp, breadth, draft);

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
    vesselModelInitialState.wind.frontalArea = VesselUtil.calculateFrontalWindArea(
      breadth,
      vesselModelInitialState.wind.superStructureHeight,
    );
  }
  if (!wind || (wind && !wind.lateralArea)) {
    vesselModelInitialState.wind.lateralArea = VesselUtil.calculateLateralWindArea(
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
