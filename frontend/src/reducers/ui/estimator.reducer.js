export default function estimatorReducer(state, action) {
  switch (action.type) {
    case 'SET_ALPHA_FOR_HEADING':
      return {
        ...state,
        alphabeta: {
          ...state.alphabeta,
          alpha: action.payload.alpha,
        },
      };
    case 'SET_BETA_FOR_HEADNG':
      return {
        ...state,
        alphabeta: {
          ...state.alphabeta,
          beta: action.payload.beta,
        },
      };
    default:
      return state;
  }
}
