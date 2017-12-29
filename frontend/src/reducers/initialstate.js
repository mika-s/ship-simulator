import { simulationState } from '../enums';
import VesselUtil from '../domain/VesselUtil';

const simulatorInitialState = {
  time: 0,
  state: simulationState.STOPPED,
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

const initialState = {
  simulation: simulatorInitialState,
  environment: environmentInitialState,
  ship: shipInitialState,
  vesselmodel: vesselModelInitialState,
};

export default initialState;
