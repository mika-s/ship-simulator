import mockInitialVesselModel from './testdata';
import controlReducer from '../control.reducer';
import getInitialState from '../initialstate';
import { vesselControlMode } from '../../../util/enums';

const initialState = getInitialState(mockInitialVesselModel).control;

it('should handle SET_CONTROL_MODE', () => {
  const action = {
    type: 'SET_CONTROL_MODE',
    payload: {
      mode: vesselControlMode.LEVER,
    },
  };

  expect(controlReducer(initialState, action))
    .toEqual({
      ...initialState,
      mode: vesselControlMode.LEVER,
    });
});
