/* eslint import/prefer-default-export: "off" */

export function setDashboardPane(number, pane) {
  return {
    type: 'SET_DASHBOARD_PANE',
    payload: {
      number,
      pane,
    },
  };
}
