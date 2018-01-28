export default function estimatorReducer(state, action, uiEstimator, positionAndVelocity) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        alphabeta: {
          ...state.alphabeta,
          alpha: uiEstimator.alphabeta.alpha,
          beta: uiEstimator.alphabeta.beta,
          position: positionAndVelocity.position,
          velocity: positionAndVelocity.velocity,
        },
      };
    default:
      return state;
  }
}
