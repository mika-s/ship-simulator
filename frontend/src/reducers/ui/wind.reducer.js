function setWindDirection(direction) {
  if (direction > 360.0) {
    throw new Error('Direction too large');
  } else if (direction < 0.0) {
    throw new Error('Direction too small');
  }

  return direction;
}

export default function windReducer(state, action) {
  switch (action.type) {
    case 'SET_WIND_SPEED':
      return {
        ...state,
        speed: action.payload.speed,
      };
    case 'SET_WIND_DIRECTION':
      return {
        ...state,
        direction: setWindDirection(action.payload.direction),
      };
    default:
      return state;
  }
}
