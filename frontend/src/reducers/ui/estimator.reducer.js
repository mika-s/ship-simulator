export default function estimatorReducer(state, action) {
  switch (action.type) {
    case 'SET_ALPHA_FOR_HEADING':
      return {
        ...state,
        alphabeta: {
          ...state.alphabeta,
          alpha: {
            ...state.alphabeta.alpha,
            heading: action.payload.alpha,
          },
        },
      };
    case 'SET_BETA_FOR_HEADING':
      return {
        ...state,
        alphabeta: {
          ...state.alphabeta,
          beta: {
            ...state.alphabeta.beta,
            heading: action.payload.beta,
          },
        },
      };
    default:
      return state;
  }
}
