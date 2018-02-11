import Estimator from '../constructors/estimator';

const estimatorInitialState = {
  estimatorChoice: {
    latitudeAndLongitude: '',
    heading: '',
  },
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

/**
* Get the initial state for the redux store for the estimator section.
* Merges hardcoded values with the values from the settings files.
* @param {Object}      initialVessel       The initial vessel values from the settings file.
* @param {Object}      initialEstimator    The initial estimator values from the settings file.
* @returns {Object} The initial state for the estimator section.
*/
function getInitialState(initialVessel, initialEstimator) {
  return Estimator(estimatorInitialState, initialVessel, initialEstimator);
}

export default getInitialState;
