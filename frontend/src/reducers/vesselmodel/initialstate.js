import VesselModel from '../constructors/vesselmodel';

const vesselModelInitialState = {
  model: {
    position: {
      latitude: 0.0,
      longitude: 0.0,
      heading: 0.0,
    },
    positionInMeters: {
      latitude: 0.0,
      longitude: 0.0,
      heading: 0.0,
    },
    velocity: {
      u: 0.0,
      v: 0.0,
      r: 0.0,
    },
  },
  forces: {
    thrusters: {
      surge: 0.0,
      sway: 0.0,
      yaw: 0.0,
    },
    wind: {
      surge: 0.0,
      sway: 0.0,
      yaw: 0.0,
    },
    current: {
      surge: 0.0,
      sway: 0.0,
      yaw: 0.0,
    },
  },
  dimensions: {
    lpp: 0.0,
    loa: 0.0,
    breadth: 0.0,
    draft: 0.0,
    blockCoefficient: 0.0,
    displacement: 0.0,
  },
  wind: {
    coefficientCalcType: '',
    vesselType: '',
    frontalArea: 0.0,
    lateralArea: 0.0,
    sL: 0.0,
    superStructureHeight: 0.0,
  },
  mass: {
    surge: 0.0,
    sway: 0.0,
    yaw: 0.0,
  },
  drag: {
    surge: 0.0,
    sway: 0.0,
    yaw: 0.0,
    yawSway: 0.0,
  },
};

/**
* Get the initial state for the redux store for the vesselmodel section.
* Merges hardcoded values with the values from the settings files.
* @param {Object}      initialVessel       The initial vessel values from the settings file.
* @returns {Object} The initial state for the vesselmodel section.
*/
function getInitialState(InitialVessel) {
  return VesselModel(vesselModelInitialState, InitialVessel);
}

export default getInitialState;
