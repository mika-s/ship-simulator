import { simulationState } from '../util/enums';
import { Gyrocompass, MRU, Windsensor, GPS, Thruster, UiThruster } from './domain-constructors';
import VesselUtil from '../reducers/vesselmodel/VesselUtil';
import InitialVessel from '../Vessel.json';

const uiInitialState = {
  thrusters: [],
};

const simulatorInitialState = {
  time: 0,
  simulationState: simulationState.STOPPED,
};

const environmentInitialState = {
  wind: {
    speed: 0.0,
    direction: 0.0,
  },
  current: {
    speed: 0.0,
    direction: 0.0,
  },
};

const shipInitialState = {
  thrusters: [],
  sensors: {
    gyrocompasses: [],
    mrus: [],
    windsensors: [],
  },
  referencesystems: {
    gpses: [],
  },
};

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
    breadth: 0.0,
    draft: 0.0,
    blockCoefficient: 0.0,
    displacement: 0.0,
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
  },
};

vesselModelInitialState.dimensions = InitialVessel.dimensions;
vesselModelInitialState.model.position = InitialVessel.model.position;

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

for (let gcIdx = 0; gcIdx < InitialVessel.sensors.gyrocompasses.length; gcIdx += 1) {
  shipInitialState.sensors.gyrocompasses
    .push(new Gyrocompass(InitialVessel.sensors.gyrocompasses[gcIdx]));
}

for (let mruIdx = 0; mruIdx < InitialVessel.sensors.mrus.length; mruIdx += 1) {
  shipInitialState.sensors.mrus.push(new MRU(InitialVessel.sensors.mrus[mruIdx]));
}

for (let wsIdx = 0; wsIdx < InitialVessel.sensors.windsensors.length; wsIdx += 1) {
  shipInitialState.sensors.windsensors
    .push(new Windsensor(InitialVessel.sensors.windsensors[wsIdx]));
}

for (let gpsIdx = 0; gpsIdx < InitialVessel.referencesystems.gpses.length; gpsIdx += 1) {
  shipInitialState.referencesystems.gpses
    .push(new GPS(InitialVessel.referencesystems.gpses[gpsIdx]));
}

for (let thrIdx = 0; thrIdx < InitialVessel.thrusters.length; thrIdx += 1) {
  shipInitialState.thrusters.push(new Thruster(InitialVessel.thrusters[thrIdx]));
  uiInitialState.thrusters.push(new UiThruster(InitialVessel.thrusters[thrIdx]));
}

const initialState = {
  ui: uiInitialState,
  simulation: simulatorInitialState,
  environment: environmentInitialState,
  ship: shipInitialState,
  vesselmodel: vesselModelInitialState,
};

export default initialState;
