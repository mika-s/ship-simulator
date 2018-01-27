export default function controlReducer(state, action, uiControl, summedError) {
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
          controllers: {
            ...state.autopilot.controllers,
            headingPid: {
              ...state.autopilot.controllers.headingPid,
              summedError,
            },
          },
        },
      };
    default:
      return state;
  }
}
