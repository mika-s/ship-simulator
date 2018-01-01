export default function vesselmodelReducer(state, action, model, forces) {
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
        },
      };
    default:
      return state;
  }
}
