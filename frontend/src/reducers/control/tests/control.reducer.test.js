import controlReducer from '../control.reducer';
import getInitialState from '../initialstate';
import { vesselControlMode } from '../../../util/enums';

const initialState = getInitialState();

it('should return the initial state when no action', () => {
  expect(controlReducer(initialState, {})).toEqual(initialState);
});

it('should handle SIMULATE', () => {
  expect(controlReducer(initialState, { type: 'SIMULATE' }, { mode: vesselControlMode.LEVER }))
    .toEqual({
      mode: vesselControlMode.LEVER,
    });
});

it('should handle STOP_SIMULATION', () => {
  expect(controlReducer(initialState, { type: 'STOP_SIMULATION' }))
    .toEqual({
      mode: vesselControlMode.LEVER,
    });
});
