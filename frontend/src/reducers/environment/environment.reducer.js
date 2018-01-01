export default function environmentReducer(state, action) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
      };
    default:
      return state;
  }
}
