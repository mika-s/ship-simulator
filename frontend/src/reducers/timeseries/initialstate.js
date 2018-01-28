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

function getInitialState() {
  return timeseriesInitialState;
}

export default getInitialState;
