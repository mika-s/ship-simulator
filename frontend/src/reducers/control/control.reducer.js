export default function controlReducer(
  state, action, uiControl,
  summedErrorHeading, summedErrorSpeed,
) {
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
              gain: uiControl.autopilot.controllers.headingPid.gain,
              summedError: summedErrorHeading,
            },
            speedPid: {
              ...state.autopilot.controllers.speedPid,
              gain: uiControl.autopilot.controllers.speedPid.gain,
              summedError: summedErrorSpeed,
            },
          },
        },
      };
    default:
      return state;
  }
}
