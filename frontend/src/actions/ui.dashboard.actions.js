export function setDashboardPane(number, pane) {
  return {
    type: 'SET_DASHBOARD_PANE',
    payload: {
      number,
      pane,
    },
  };
}

export function toggleAutoAxis(number) {
  return {
    type: 'TOGGLE_AUTO_AXIS',
    payload: {
      number,
    },
  };
}

export function setMinMax(number, min, max) {
  return {
    type: 'SET_MIN_MAX_AXIS',
    payload: {
      number,
      min,
      max,
    },
  };
}

export function setMinMax2(number, min, max) {
  return {
    type: 'SET_MIN_MAX2_AXIS',
    payload: {
      number,
      min,
      max,
    },
  };
}

export function setMinMax3(number, min, max) {
  return {
    type: 'SET_MIN_MAX3_AXIS',
    payload: {
      number,
      min,
      max,
    },
  };
}

