import { initialVesselModel, initialController, initialEstimator } from './testdata';
import thrusterReducer from '../thruster.reducer';
import getInitialState from '../initialstate';

const initialState =
  getInitialState(initialVesselModel, initialController, initialEstimator).thrusters;

it('should handle SET_THRUSTER_DEMAND', () => {
  const action = {
    type: 'SET_THRUSTER_DEMAND',
    payload: {
      number: 1,
      type: 'pitch',
      demand: 50.0,
    },
  };

  expect(thrusterReducer(initialState, action))
    .toEqual([
      { number: 1, demand: { rpm: 0.0, pitch: 50.0, azimuth: 0.0 } },
      { number: 2, demand: { rpm: 0.0, pitch: 0.0, azimuth: 0.0 } },
      { number: 3, demand: { rpm: 0.0, pitch: 0.0, azimuth: 0.0 } },
    ]);
});
