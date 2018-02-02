/**
* Modify the estimator object given it's initial state and the initial vessel
* parameters from Vessel.json.
* @param {Object} estimatorInitialState    - The initial state object for the estimator.
* @param {Object} initialVessel            - The initial vessel parameters from Vessel.json.
* @returns {Object} The modified estimator initial state object.
*/
function Estimator(estimatorInitialState, initialVessel, initialEstimator) {
  estimatorInitialState.alphabeta.position.heading = initialVessel.model.position.heading;
  estimatorInitialState.alphabeta.alpha = initialEstimator.alphabeta.alpha;
  estimatorInitialState.alphabeta.beta = initialEstimator.alphabeta.beta;

  return estimatorInitialState;
}

export default Estimator;
