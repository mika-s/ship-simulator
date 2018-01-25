import controlReducer from '../control.reducer';
import getInitialState from '../initialstate';
import { vesselControlMode } from '../../../util/enums';

const initialState = getInitialState();

it('should return the initial state when no action', () => {
  expect(controlReducer(initialState, {})).toEqual(initialState);
});

it('should handle SIMULATE', () => {
  const uiControl = {
    mode: vesselControlMode.AUTOPILOT,
    autopilot: {
      active: false,
      heading: 0.0,
      speed: 0.0,
    },
  };

  expect(controlReducer(initialState, { type: 'SIMULATE' }, uiControl))
    .toEqual({
      mode: vesselControlMode.AUTOPILOT,
      autopilot: {
        active: false,
        heading: 0.0,
        speed: 0.0,
        maxRudderAngle: 30.0,
        controllers: {
          headingPid: {
            gain: { p: 100, i: 1, d: 1 },
            force: { p: 0, i: 0, d: 0 },
            summedError: 0,
          },
          speedPid: {
            gain: { p: 5, i: 1, d: 1 },
            force: { p: 0, i: 0, d: 0 },
            summedError: 0,
          },
        },
      },
    });
});

it('should handle STOP_SIMULATION', () => {
  expect(controlReducer(initialState, { type: 'STOP_SIMULATION' }))
    .toEqual({
      mode: vesselControlMode.AUTOPILOT,
      autopilot: {
        active: false,
        heading: 0.0,
        speed: 0.0,
        maxRudderAngle: 30.0,
        controllers: {
          headingPid: {
            gain: { p: 100, i: 1, d: 1 },
            force: { p: 0, i: 0, d: 0 },
            summedError: 0,
          },
          speedPid: {
            gain: { p: 5, i: 1, d: 1 },
            force: { p: 0, i: 0, d: 0 },
            summedError: 0,
          },
        },
      },
    });
});
