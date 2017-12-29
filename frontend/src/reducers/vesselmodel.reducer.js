import VesselUtil from '../domain/VesselUtil';
import VesselModel from './NewVesselModel';

const initialState = {
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

initialState.dimensions.lpp = 84.0;
initialState.dimensions.breadth = 20.0;
initialState.dimensions.draft = 5.0;
initialState.dimensions.blockCoefficient = 0.71;
initialState.model.position.latitude = 50.0;
initialState.model.position.longitude = 4.0;
initialState.model.position.heading = 0.0;

initialState.dimensions.displacement = VesselUtil.calculateDisplacement(initialState.dimensions);

initialState.mass = VesselUtil.calculateMass(
  initialState.dimensions.displacement,
  initialState.dimensions.lpp,
);

initialState.drag = VesselUtil.calculateDrag(
  initialState.dimensions.lpp,
  initialState.dimensions.breadth,
  initialState.dimensions.draft,
);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INC_SIMULATION_TIME':
      return {
        ...state,
        model: VesselModel.calculatePosition(
          state.mass,
          state.drag,
          state.forces,
          state.model.position,
          state.model.positionInMeters,
          state.model.velocity,
        ),
      };
    default:
      return state;
  }
}
