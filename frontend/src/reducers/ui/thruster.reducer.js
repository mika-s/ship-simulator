export default function thrusterReducer(state, action) {
  switch (action.type) {
    case 'SET_THRUSTER_DEMAND':
      return state.map((thruster) => {
        if (thruster.number === action.payload.number) {
          thruster.demand[action.payload.type] = action.payload.demand;
        }
        return thruster;
      });
    default:
      return state;
  }
}
