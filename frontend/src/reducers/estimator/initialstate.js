import Estimator from '../constructors/estimator';

const estimatorInitialState = {
  alphabeta: {
    alpha: {
      latitude: 0.0,
      longitude: 0.0,
      heading: 0.0,
    },
    beta: {
      latitude: 0.0,
      longitude: 0.0,
      heading: 0.0,
    },
    position: {
      latitude: 0.0,
      longitude: 0.0,
      heading: 0.0,
    },
    velocity: {
      u: 0.0,
      v: 0.0,
      r: 0.0,
    },
    acceleration: {
      ud: 0.0,
      vd: 0.0,
      rd: 0.0,
    },
  },
};

function getInitialState(initialVessel, initialEstimator) {
  return Estimator(estimatorInitialState, initialVessel, initialEstimator);
}

export default getInitialState;
