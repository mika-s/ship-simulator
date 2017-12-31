import { simulationState } from '../../util/enums';

export default function simulationReducer(state, action) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        simulationState: simulationState.RUNNING,
        time: state.time + 1,
      };
    case 'PAUSE_SIMULATION':
      return {
        ...state,
        simulationState: simulationState.PAUSED,
        time: state.time,
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        simulationState: simulationState.STOPPED,
        time: 0,
      };
    default:
      return state;
  }
}
