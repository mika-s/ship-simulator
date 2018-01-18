export default function controlReducer(state, action) {
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
    default:
      return state;
  }
}
