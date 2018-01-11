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
          azimuth: ThrUtil.isAzi(state.thrusterType) ? state.demand.azimuth : 0.0,
        },
        feedback: {
          rpm: 0.0,
          pitch: 0.0,
          azimuth: ThrUtil.isAzi(state.thrusterType) ? state.feedback.azimuth : 0.0,
        },
        force: 0.0,
        power: 0.0,
      };
    default:
      return state;
  }
}
