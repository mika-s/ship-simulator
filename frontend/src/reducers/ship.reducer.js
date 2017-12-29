export default function shipReducer(state, action) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
      };
    default:
      return state;
  }
}
