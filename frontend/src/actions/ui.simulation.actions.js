export function setWindSpeed(speed) {
  return {
    type: 'SET_WIND_SPEED',
    payload: {
      speed,
    },
  };
}

export function setWindDirection(direction) {
  return {
    type: 'SET_WIND_DIRECTION',
    payload: {
      direction,
    },
  };
}

export function setPosition(position) {
  return {
    type: 'SET_INITIAL_POSITION',
    payload: {
      position,
    },
  };
}
