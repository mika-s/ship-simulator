import { initialVesselModel, initialController, initialEstimator } from './testdata';
import controlReducer from '../control.reducer';
import getInitialState from '../initialstate';
import { vesselControlMode } from '../../../util/enums';

const initialState =
  getInitialState(initialVesselModel, initialController, initialEstimator).control;

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
      mode: action.payload.mode,
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
        heading: action.payload.heading,
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
        speed: action.payload.speed,
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
        controllers: {
          ...initialState.autopilot.controllers,
          headingPid: {
            ...initialState.autopilot.controllers.headingPid,
            gain: {
              ...initialState.autopilot.controllers.headingPid.gain,
              p: action.payload.gain,
            },
          },
        },
      },
    });
});

it('should handle SET_AUTOPILOT_I_GAIN', () => {
  const action = {
    type: 'SET_AUTOPILOT_I_GAIN',
    payload: {
      gain: 1.0,
    },
  };

  expect(controlReducer(initialState, action))
    .toEqual({
      ...initialState,
      autopilot: {
        ...initialState.autopilot,
        controllers: {
          ...initialState.autopilot.controllers,
          headingPid: {
            ...initialState.autopilot.controllers.headingPid,
            gain: {
              ...initialState.autopilot.controllers.headingPid.gain,
              i: action.payload.gain,
            },
          },
        },
      },
    });
});

it('should handle SET_AUTOPILOT_D_GAIN', () => {
  const action = {
    type: 'SET_AUTOPILOT_D_GAIN',
    payload: {
      gain: 1.0,
    },
  };

  expect(controlReducer(initialState, action))
    .toEqual({
      ...initialState,
      autopilot: {
        ...initialState.autopilot,
        controllers: {
          ...initialState.autopilot.controllers,
          headingPid: {
            ...initialState.autopilot.controllers.headingPid,
            gain: {
              ...initialState.autopilot.controllers.headingPid.gain,
              d: action.payload.gain,
            },
          },
        },
      },
    });
});

it('should handle SET_AUTOPILOT_SPEED_P_GAIN', () => {
  const action = {
    type: 'SET_AUTOPILOT_SPEED_P_GAIN',
    payload: {
      gain: 1.0,
    },
  };

  expect(controlReducer(initialState, action))
    .toEqual({
      ...initialState,
      autopilot: {
        ...initialState.autopilot,
        controllers: {
          ...initialState.autopilot.controllers,
          speedPid: {
            ...initialState.autopilot.controllers.speedPid,
            gain: {
              ...initialState.autopilot.controllers.speedPid.gain,
              p: action.payload.gain,
            },
          },
        },
      },
    });
});

it('should handle SET_AUTOPILOT_SPEED_I_GAIN', () => {
  const action = {
    type: 'SET_AUTOPILOT_SPEED_I_GAIN',
    payload: {
      gain: 1.0,
    },
  };

  expect(controlReducer(initialState, action))
    .toEqual({
      ...initialState,
      autopilot: {
        ...initialState.autopilot,
        controllers: {
          ...initialState.autopilot.controllers,
          speedPid: {
            ...initialState.autopilot.controllers.speedPid,
            gain: {
              ...initialState.autopilot.controllers.speedPid.gain,
              i: action.payload.gain,
            },
          },
        },
      },
    });
});

it('should handle SET_AUTOPILOT_SPEED_D_GAIN', () => {
  const action = {
    type: 'SET_AUTOPILOT_SPEED_D_GAIN',
    payload: {
      gain: 1.0,
    },
  };

  expect(controlReducer(initialState, action))
    .toEqual({
      ...initialState,
      autopilot: {
        ...initialState.autopilot,
        controllers: {
          ...initialState.autopilot.controllers,
          speedPid: {
            ...initialState.autopilot.controllers.speedPid,
            gain: {
              ...initialState.autopilot.controllers.speedPid.gain,
              d: action.payload.gain,
            },
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
        active: !initialState.autopilot.active,
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
      mode: control.mode,
    });
});
