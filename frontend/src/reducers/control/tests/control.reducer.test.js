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
      controllers: {
        headingPid: { gain: { p: 0.0, i: 0.0, d: 0.0 } },
        speedPid: { gain: { p: 0.0, i: 0.0, d: 0.0 } },
      },
    },
  };
  const summedErrorHeading = 0.0;
  const summedErrorSpeed = 0.0;

  expect(controlReducer(initialState, { type: 'SIMULATE' }, uiControl, summedErrorHeading, summedErrorSpeed))
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
              p: uiControl.autopilot.controllers.headingPid.gain.p,
              i: uiControl.autopilot.controllers.headingPid.gain.i,
              d: uiControl.autopilot.controllers.headingPid.gain.d,
            },
            summedError: summedErrorHeading,
            antiWindup: {
              sector: 0.0,
              maxI: 0.0,
            },
          },
          speedPid: {
            gain: {
              p: uiControl.autopilot.controllers.speedPid.gain.p,
              i: uiControl.autopilot.controllers.speedPid.gain.i,
              d: uiControl.autopilot.controllers.speedPid.gain.d,
            },
            summedError: summedErrorSpeed,
          },
        },
      },
    });
});
