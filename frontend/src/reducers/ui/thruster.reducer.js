export default function thrusterReducer(state, action) {
  switch (action.type) {
    case 'SET_THRUSTER_DEMAND':
      return state.map((thruster) => {
        if (thruster.number === action.payload.number) {
          thruster.demand[action.payload.type] = action.payload.demand;
        }
        return thruster;
      });
    case 'STOP_SIMULATION':
      return state.map((thruster) => {
        thruster.demand.rpm = 0.0;
        thruster.demand.pitch = 0.0;
        thruster.demand.azimuth = 0.0;
        return thruster;
      });
    default:
      return state;
  }
}
