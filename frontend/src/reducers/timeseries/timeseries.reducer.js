function updateArray(oldPosition, model) {
  const secondToSave = 30;

  const newPosition = oldPosition.slice();

  if (newPosition.length < secondToSave) {
    newPosition.push(model);
  } else {
    newPosition.shift();
    newPosition.push(model);
  }

  return newPosition;
}

export default function timeseriesReducer(state, action, model) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        model: {
          position: {
            latitude: updateArray(state.model.position.latitude, model.position.latitude),
            longitude: updateArray(state.model.position.longitude, model.position.longitude),
            heading: updateArray(state.model.position.heading, model.position.heading),
          },
        },
      };
    case 'STOP_SIMULATION':
      return {
        ...state,

        model: {
          position: {
            latitude: [],
            longitude: [],
            heading: [],
          },
        },
      };
    default:
      return state;
  }
}
