export default function vesselmodelReducer(state, action, model, forces, uiPosition) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        forces,
        model,
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        forces: {
          thrusters: {
            surge: 0.0,
            sway: 0.0,
            yaw: 0.0,
          },
          wind: {
            surge: 0.0,
            sway: 0.0,
            yaw: 0.0,
          },
          current: {
            surge: 0.0,
            sway: 0.0,
            yaw: 0.0,
          },
        },
        model: {
          position: {
            latitude: uiPosition.latitude,
            longitude: uiPosition.longitude,
            heading: uiPosition.heading * (Math.PI / 180.0),
          },
          positionInMeters: {
            latitude: 0.0,
            longitude: 0.0,
            heading: uiPosition.heading * (Math.PI / 180.0),
          },
          velocity: {
            u: 0.0,
            v: 0.0,
            r: 0.0,
          },
        },
      };
    case 'SET_INITIAL_POSITION':
      return {
        ...state,
        model: {
          ...state.model,
          position: {
            latitude: action.payload.position.latitude,
            longitude: action.payload.position.longitude,
            heading: action.payload.position.heading * (Math.PI / 180.0),
          },
          positionInMeters: {
            ...state.model.positionInMeters,
            heading: action.payload.position.heading * (Math.PI / 180.0),
          },
        },
      };
    default:
      return state;
  }
}
