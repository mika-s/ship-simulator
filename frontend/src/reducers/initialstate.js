import { simulationState } from '../util/enums';
import { Gyrocompass, MRU, Windsensor, GPS, Thruster } from './domain-constructors';
import VesselUtil from '../reducers/vesselmodel/VesselUtil';

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

vesselModelInitialState.dimensions.lpp = 84.0;
vesselModelInitialState.dimensions.breadth = 20.0;
vesselModelInitialState.dimensions.draft = 5.0;
vesselModelInitialState.dimensions.blockCoefficient = 0.71;
vesselModelInitialState.model.position.latitude = 50.0;
vesselModelInitialState.model.position.longitude = 4.0;
vesselModelInitialState.model.position.heading = 0.0;

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

shipInitialState.sensors.gyrocompasses = [
  new Gyrocompass(1, 0.0),
  new Gyrocompass(2, 0.0),
  new Gyrocompass(3, 0.0),
];

shipInitialState.sensors.mrus = [
  new MRU(1, 0.0, 0.0),
];

shipInitialState.sensors.windsensors = [
  new Windsensor(1, 0.0, 0.0),
  new Windsensor(2, 0.0, 0.0),
];

shipInitialState.referencesystems.gpses = [
  new GPS(1, 50.0, 4.0),
];

shipInitialState.thrusters = [
  new Thruster(1, 'Tunnel', 'tunnel', 'pitch', 800.0, 800.0, 45.0, 0.0, 1.8, 1.8),
  new Thruster(2, 'Port prop', 'azimuth', 'rpm', 2000.0, 1500.0, -45.0, -5.0),
  new Thruster(3, 'Stbd prop', 'azimuth', 'rpm', 2000.0, 1500.0, -45.0, 5.0),
];

const initialState = {
  simulation: simulatorInitialState,
  environment: environmentInitialState,
  ship: shipInitialState,
  vesselmodel: vesselModelInitialState,
};

export default initialState;
