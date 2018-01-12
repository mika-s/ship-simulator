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
};

function getInitialState() {
  return timeseriesInitialState;
}

export default getInitialState;
