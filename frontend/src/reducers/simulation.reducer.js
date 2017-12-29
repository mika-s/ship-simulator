import { simulationState } from '../enums';

export default function simulationReducer(state, action) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        simulationState: simulationState.RUNNING,
        time: state.time + 1,
      };
    case 'PAUSE_SIMULATION':
      return {
        simulationState: simulationState.PAUSED,
        time: state.time,
      };
    case 'STOP_SIMULATION':
      return {
        simulationState: simulationState.STOPPED,
        time: 0,
      };
    default:
      return state;
  }
}
