import { setDemand, getFeedback, getForces, getPower, isAzi } from './thruster.util';

export default function thrusterReducer(state, action, demand) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        demand: setDemand(state, demand),
        feedback: getFeedback(state),
        force: getForces(state),
        power: getPower(state),
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        demand: {
          rpm: 0.0,
          pitch: 0.0,
          azimuth: isAzi(state.thrusterType) ? 0.0 : state.demand.azimuth,
        },
        feedback: {
          rpm: 0.0,
          pitch: 0.0,
          azimuth: isAzi(state.thrusterType) ? 0.0 : state.feedback.azimuth,
        },
        force: 0.0,
        power: 0.0,
      };
    default:
      return state;
  }
}
