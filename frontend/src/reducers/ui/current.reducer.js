function setCurrentDirection(direction) {
  if (direction > 360.0) {
    throw new Error('Direction too large');
  } else if (direction < 0.0) {
    throw new Error('Direction too small');
  }

  return direction;
}

export default function settingsReducer(state, action) {
  switch (action.type) {
    case 'SET_CURRENT_SPEED':
      return {
        ...state,
        speed: action.payload.speed,
      };
    case 'SET_CURRENT_DIRECTION':
      return {
        ...state,
        direction: setCurrentDirection(action.payload.direction),
      };
    default:
      return state;
  }
}
