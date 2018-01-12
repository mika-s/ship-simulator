export default function settingsReducer(state, action) {
  switch (action.type) {
    case 'SET_INITIAL_POSITION':
      return action.payload.position;
    default:
      return state;
  }
}
