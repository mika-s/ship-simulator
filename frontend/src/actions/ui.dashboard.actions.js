export function setDashboardPane(number, pane) {
  return {
    type: 'SET_DASHBOARD_PANE',
    payload: {
      number,
      pane,
    },
  };
}
