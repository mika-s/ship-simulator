export default function controlReducer(state, action, uiControl) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        mode: uiControl.mode,
        autopilot: {
          ...state.autopilot,
          active: uiControl.autopilot.active,
          heading: uiControl.autopilot.heading,
          speed: uiControl.autopilot.speed,
        },
      };
    default:
      return state;
  }
}
