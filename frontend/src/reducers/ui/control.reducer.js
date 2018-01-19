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
