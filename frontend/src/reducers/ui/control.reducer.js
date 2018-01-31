export default function controlReducer(state, action, control) {
  switch (action.type) {
    case 'SET_CONTROL_MODE':
      return {
        ...state,
        mode: action.payload.mode,
      };
    case 'SET_AUTOPILOT_HEADING':
      return {
        ...state,
        autopilot: {
          ...state.autopilot,
          heading: action.payload.heading,
        },
      };
    case 'SET_AUTOPILOT_SPEED':
      return {
        ...state,
        autopilot: {
          ...state.autopilot,
          speed: action.payload.speed,
        },
      };
    case 'SET_AUTOPILOT_P_GAIN':
      return {
        ...state,
        autopilot: {
          ...state.autopilot,
          controllers: {
            ...state.autopilot.controllers,
            headingPid: {
              ...state.autopilot.controllers.headingPid,
              gain: {
                ...state.autopilot.controllers.headingPid.gain,
                p: action.payload.gain,
              },
            },
          },
        },
      };
    case 'SET_AUTOPILOT_I_GAIN':
      return {
        ...state,
        autopilot: {
          ...state.autopilot,
          controllers: {
            ...state.autopilot.controllers,
            headingPid: {
              ...state.autopilot.controllers.headingPid,
              gain: {
                ...state.autopilot.controllers.headingPid.gain,
                i: action.payload.gain,
              },
            },
          },
        },
      };
    case 'SET_AUTOPILOT_D_GAIN':
      return {
        ...state,
        autopilot: {
          ...state.autopilot,
          controllers: {
            ...state.autopilot.controllers,
            headingPid: {
              ...state.autopilot.controllers.headingPid,
              gain: {
                ...state.autopilot.controllers.headingPid.gain,
                d: action.payload.gain,
              },
            },
          },
        },
      };
    case 'TOGGLE_AUTOPILOT':
      return {
        ...state,
        autopilot: {
          ...state.autopilot,
          active: !state.autopilot.active,
        },
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        mode: control.mode,
      };
    default:
      return state;
  }
}
