import { vesselControlMode } from '../../util/enums';

export default function controlReducer(state, action, uiControl) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        mode: uiControl.mode,
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        mode: vesselControlMode.LEVER,
      };
    default:
      return state;
  }
}
