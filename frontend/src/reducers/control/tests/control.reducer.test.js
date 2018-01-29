import controlReducer from '../control.reducer';
import getInitialState from '../initialstate';
import controllerdata from './testdata';
import { vesselControlMode } from '../../../util/enums';

const initialState = getInitialState(controllerdata);

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
  const summedError = 0.0;

  expect(controlReducer(initialState, { type: 'SIMULATE' }, uiControl, summedError))
    .toEqual({
      mode: vesselControlMode.AUTOPILOT,
      autopilot: {
        active: false,
        heading: 0.0,
        speed: 0.0,
        maxRudderAngle: 30.0,
        controllers: {
          headingPid: {
            gain: {
              p: controllerdata.autopilot.controllers.headingPid.gain.p,
              i: controllerdata.autopilot.controllers.headingPid.gain.i,
              d: controllerdata.autopilot.controllers.headingPid.gain.d,
            },
            summedError,
          },
          speedPid: {
            gain: {
              p: controllerdata.autopilot.controllers.speedPid.gain.p,
              i: controllerdata.autopilot.controllers.speedPid.gain.i,
              d: controllerdata.autopilot.controllers.speedPid.gain.d,
            },
            summedError,
          },
        },
      },
    });
});
