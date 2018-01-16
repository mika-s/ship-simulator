import ThrUtil from './thruster.util';

export default function thrusterReducer(state, action, demand) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        demand: ThrUtil.setDemand(state, demand),
        feedback: ThrUtil.getFeedback(state),
        force: ThrUtil.getForces(state),
        power: ThrUtil.getPower(state),
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        demand: {
          rpm: 0.0,
          pitch: 0.0,
          azimuth: ThrUtil.isAzi(state.thrusterType) ? 0.0 : state.demand.azimuth,
        },
        feedback: {
          rpm: 0.0,
          pitch: 0.0,
          azimuth: ThrUtil.isAzi(state.thrusterType) ? 0.0 : state.feedback.azimuth,
        },
        force: 0.0,
        power: 0.0,
      };
    default:
      return state;
  }
}
