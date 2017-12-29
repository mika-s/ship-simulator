import { simulationState } from '../enums';

export default function reducer(state = {
  time: 0,
  state: simulationState.STOPPED,
}, action) {
  switch (action.type) {
    case 'INC_SIMULATION_TIME':
      return { ...state, time: state.time + 1 };
    case 'PAUSE_SIMULATION_TIME':
      return { ...state, time: state.time };
    case 'STOP_SIMULATION_TIME':
      return { ...state, time: 0 };
    case 'SET_SIMULATION_STATE':
      return { ...state, state: action.payload.state };
    default:
      return state;
  }
}
