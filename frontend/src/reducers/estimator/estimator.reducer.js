export default function estimatorReducer(state, action, uiEstimator, estimated) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        alphabeta: {
          ...state.alphabeta,
          alpha: uiEstimator.alphabeta.alpha,
          beta: uiEstimator.alphabeta.beta,
          position: estimated.position,
          velocity: estimated.velocity,
          acceleration: estimated.acceleration,
        },
      };
    default:
      return state;
  }
}
