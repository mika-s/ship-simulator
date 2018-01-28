import Estimator from '../constructors/estimator';

const estimatorInitialState = {
  alphabeta: {
    alpha: 0.0,
    beta: 0.0,
    position: {
      longitude: 0.0,
      latitude: 0.0,
      heading: 0.0,
    },
    velocity: {
      u: 0.0,
      v: 0.0,
      r: 0.0,
    },
  },
};

function getInitialState(initialVessel, initialEstimator) {
  return Estimator(estimatorInitialState, initialVessel, initialEstimator);
}

export default getInitialState;
