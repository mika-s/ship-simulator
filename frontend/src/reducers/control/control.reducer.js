import { vesselControlMode } from '../../util/enums';

export default function controlReducer(state, action, uiControl) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        mode: uiControl.mode,
        autopilot: {
          ...state.autopilot,
          heading: uiControl.autopilot.heading,
        },
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        mode: vesselControlMode.AUTOPILOT,
      };
    default:
      return state;
  }
}
