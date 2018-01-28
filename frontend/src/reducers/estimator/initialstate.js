import Estimator from '../constructors/estimator';

const estimatorInitialState = {
  alphabeta: {
    alpha: 0.3,
    beta: 0.05,
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

function getInitialState(InitialVessel) {
  return Estimator(estimatorInitialState, InitialVessel);
}

export default getInitialState;
