export default function controlReducer(state, action, uiControl) {
  console.log(uiControl);
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        mode: uiControl.mode,
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        mode: 0,
      };
    default:
      return state;
  }
}
