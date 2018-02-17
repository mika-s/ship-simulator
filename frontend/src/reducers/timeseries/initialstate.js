const timeseriesInitialState = {
  time: [],
  estimator: {
    alphabeta: {
      position: {
        longitude: [],
        latitude: [],
        heading: [],
      },
      velocity: {
        u: [],
        v: [],
        r: [],
      },
    },
  },
  autopilot: {
    controllers: {
      headingPid: {
        p: [],
        i: [],
        d: [],
      },
      speedPid: {
        p: [],
        i: [],
        d: [],
      },
    },
  },
  model: {
    position: {
      latitude: [],
      longitude: [],
      heading: [],
    },
  },
  sensors: {
    roll: [],
    pitch: [],
  },
  referencesystems: {
    speed: [],
  },
};

/**
* Get the initial state for the redux store for the timeseries section.
* @returns {Object} The initial state for the timeseries section.
*/
function getInitialState() {
  return timeseriesInitialState;
}

export default getInitialState;
