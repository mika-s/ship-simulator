export default function controlReducer(state, action) {
  switch (action.type) {
    case 'SET_CONTROL_MODE':
      return {
        ...state,
        mode: action.payload.mode,
      };
    default:
      return state;
  }
}
