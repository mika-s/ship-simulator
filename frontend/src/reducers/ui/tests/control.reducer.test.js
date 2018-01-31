import { initialVesselModel, initialEstimator } from './testdata';
import controlReducer from '../control.reducer';
import getInitialState from '../initialstate';
import { vesselControlMode } from '../../../util/enums';

const initialState = getInitialState(initialVesselModel, initialEstimator).control;

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

it('should handle SET_AUTOPILOT_HEADING', () => {
  const action = {
    type: 'SET_AUTOPILOT_HEADING',
    payload: {
      heading: 123.4,
    },
  };

  expect(controlReducer(initialState, action))
    .toEqual({
      ...initialState,
      autopilot: {
        ...initialState.autopilot,
        heading: 123.4,
      },
    });
});

it('should handle SET_AUTOPILOT_SPEED', () => {
  const action = {
    type: 'SET_AUTOPILOT_SPEED',
    payload: {
      speed: 1.0,
    },
  };

  expect(controlReducer(initialState, action))
    .toEqual({
      ...initialState,
      autopilot: {
        ...initialState.autopilot,
        speed: 1.0,
      },
    });
});

it('should handle SET_AUTOPILOT_P_GAIN', () => {
  const action = {
    type: 'SET_AUTOPILOT_P_GAIN',
    payload: {
      gain: 1.0,
    },
  };

  expect(controlReducer(initialState, action))
    .toEqual({
      ...initialState,
      autopilot: {
        ...initialState.autopilot,
        headingPid: {
          ...initialState.autopilot.headingPid,
          gain: {
            ...initialState.autopilot.headingPid.gain,
            p: 1.0,
          },
        },
      },
    });
});

it('should handle TOGGLE_AUTOPILOT', () => {
  const action = {
    type: 'TOGGLE_AUTOPILOT',
  };

  expect(controlReducer(initialState, action))
    .toEqual({
      ...initialState,
      autopilot: {
        ...initialState.autopilot,
        active: true,
      },
    });
});

it('should handle STOP_SIMULATION', () => {
  const action = {
    type: 'STOP_SIMULATION',
  };

  const control = { mode: vesselControlMode.AUTOPILOT };

  expect(controlReducer(initialState, action, control))
    .toEqual({
      ...initialState,
      mode: vesselControlMode.AUTOPILOT,
    });
});
