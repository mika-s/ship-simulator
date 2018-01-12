import mockInitialVesselModel from './testdata';
import dashboardReducer from '../dashboard.reducer';
import getInitialState from '../initialstate';

const initialState = getInitialState(mockInitialVesselModel).dashboard;

it('should handle SET_DASHBOARD_PANE', () => {
  const action = {
    type: 'SET_DASHBOARD_PANE',
    payload: {
      number: 1,
      pane: 'heading',
    },
  };

  expect(dashboardReducer(initialState, action))
    .toEqual({
      ...initialState,
      panes: {
        ...initialState.panes,
        1: 'heading',
      },
    });
});
