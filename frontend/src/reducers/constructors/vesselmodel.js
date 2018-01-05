import VesselUtil from '../vesselmodel/vessel.util';

function VesselModel(vesselModelInitialState, initialVessel) {
  vesselModelInitialState.dimensions = initialVessel.dimensions;
  vesselModelInitialState.model.position = initialVessel.model.position;
  vesselModelInitialState.initialPosition = initialVessel.model.position;

  vesselModelInitialState.dimensions.displacement =
    VesselUtil.calculateDisplacement(vesselModelInitialState.dimensions);

  vesselModelInitialState.mass = VesselUtil.calculateMass(
    vesselModelInitialState.dimensions.displacement,
    vesselModelInitialState.dimensions.lpp,
  );

  vesselModelInitialState.drag = VesselUtil.calculateDrag(
    vesselModelInitialState.dimensions.lpp,
    vesselModelInitialState.dimensions.breadth,
    vesselModelInitialState.dimensions.draft,
  );

  // Set optional parameters.
  if (!initialVessel.dimensions.loa) {
    vesselModelInitialState.dimensions.loa = 1.08 * initialVessel.dimensions.lpp;
  }
  if (!initialVessel.wind || (initialVessel.wind && !initialVessel.wind.superStructureHeight)) {
    const hbExperienceRatio = 0.85; // height / breath
    vesselModelInitialState.wind.superStructureHeight =
      hbExperienceRatio * vesselModelInitialState.dimensions.breadth;
  }
  if (!initialVessel.wind || (initialVessel.wind && !initialVessel.wind.frontalArea)) {
    vesselModelInitialState.wind.frontalArea =
      VesselUtil.calculateFrontalWindArea(
        vesselModelInitialState.dimensions.breadth,
        vesselModelInitialState.wind.superStructureHeight,
      );
  }
  if (!initialVessel.wind || (initialVessel.wind && !initialVessel.wind.lateralArea)) {
    vesselModelInitialState.wind.lateralArea =
      VesselUtil.calculateLateralWindArea(
        vesselModelInitialState.dimensions.loa,
        vesselModelInitialState.wind.superStructureHeight,
      );
  }
  if (!initialVessel.wind || (initialVessel.wind && !initialVessel.wind.vesselType)) {
    vesselModelInitialState.wind.vesselType = 'Offshore supply vessel';
  }
  if (!initialVessel.wind || (initialVessel.wind && !initialVessel.wind.coefficientCalcType)) {
    vesselModelInitialState.wind.coefficientCalcType = 'blendermann';
  }
  if (!initialVessel.wind || (initialVessel.wind && !initialVessel.wind.sL)) {
    const experienceRatio = 0.20;
    vesselModelInitialState.wind.sL = experienceRatio * initialVessel.dimensions.lpp;
  }

  return vesselModelInitialState;
}

export default VesselModel;
