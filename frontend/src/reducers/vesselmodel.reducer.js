const emptyModel = {
  position: {
    latitude: 0.0,
    longitude: 0.0,
    heading: 0.0,
  },
  positionInMeters: {
    latitude: 0.0,
    longitude: 0.0,
    heading: 0.0,
  },
  velocity: {
    u: 0.0,
    v: 0.0,
    r: 0.0,
  },
};

export default function vesselmodelReducer(state, action, model) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        model,
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        model: emptyModel,
      };
    default:
      return state;
  }
}
