const timeseriesInitialState = {
  time: [],
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
