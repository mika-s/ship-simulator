export default function estimatorReducer(state, action, positionAndVelocity) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        alphabeta: {
          ...state.alphabeta,
          position: positionAndVelocity.position,
          velocity: positionAndVelocity.velocity,
        },
      };
    default:
      return state;
  }
}
