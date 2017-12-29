export function setWindSpeed(speed) {
  return {
    type: 'SET_SPEED',
    payload: {
      speed,
    },
  };
}

export function setWindDirection(direction) {
  return {
    type: 'SET_DIRECTION',
    payload: {
      direction,
    },
  };
}

export function resetWind() {
  return {
    type: 'RESET',
  };
}

