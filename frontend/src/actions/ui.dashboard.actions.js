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

