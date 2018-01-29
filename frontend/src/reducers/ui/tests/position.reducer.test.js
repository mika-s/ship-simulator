import { initialVesselModel, initialEstimator } from './testdata';
import positionReducer from '../position.reducer';
import getInitialState from '../initialstate';

const initialState = getInitialState(initialVesselModel, initialEstimator).position;

it('should handle SET_INITIAL_POSITION', () => {
  const action = {
    type: 'SET_INITIAL_POSITION',
    payload: {
      position: {
        latitude: 55.0,
        longitude: 10.0,
        heading: 123.0,
      },
    },
  };

  expect(positionReducer(initialState, action))
    .toEqual({
      ...initialState,
      latitude: 55.0,
      longitude: 10.0,
      heading: 123.0,
    });
});
