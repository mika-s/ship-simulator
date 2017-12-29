export default function simulationReducer(state, action) {
  return {
    ...state,
    time: state.time + 1,
  };
}
