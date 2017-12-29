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

export function resetWind() {
  return {
    type: 'RESET_WIND',
  };
}

