import simulationReducer from '../simulation.reducer';
import initialState from '../initialstate';
import { simulationState } from '../../../util/enums';

it('should return the initial state when no action', () => {
  expect(simulationReducer(initialState, {})).toEqual(initialState);
});

it('should handle SIMULATE', () => {
  expect(simulationReducer(initialState, { type: 'SIMULATE' }))
    .toEqual({
      simulationState: simulationState.RUNNING,
      time: 1,
    });
});
