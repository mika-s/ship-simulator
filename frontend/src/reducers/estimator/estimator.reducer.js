/**
* The reducer for the estimator section.
* @param {Object}    state               The state object (rootstate.estimator).
* @param {Object}    action              The action object.
* @param {Object}    uiEstimator         The estimator object for the UI (rootstate.ui.estimator)
* @param {Object}    estimated           The estimated values from the estimator.
* @returns {Object} The estimator section updated.
*/
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
