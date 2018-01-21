import * as actions from '../ui.dashboard.actions';

it('should create an action to set a dashboard pane', () => {
  const number = 1;
  const pane = 'heading';

  const expectedAction = {
    type: 'SET_DASHBOARD_PANE',
    payload: {
      number,
      pane,
    },
  };

  expect(actions.setDashboardPane(number, pane)).toEqual(expectedAction);
});

it('should create an action to toggle auto axis', () => {
  const number = 1;

  const expectedAction = {
    type: 'TOGGLE_AUTO_AXIS',
    payload: {
      number,
    },
  };

  expect(actions.toggleAutoAxis(number)).toEqual(expectedAction);
});

