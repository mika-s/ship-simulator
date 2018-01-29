import { vesselControlMode } from '../../util/enums';

const controlInitialState = {
  mode: vesselControlMode.AUTOPILOT,
  autopilot: {
    active: false,
    heading: 0.0,
    speed: 0.0,
    maxRudderAngle: 30.0,
    controllers: {
      headingPid: {
        gain: { p: 0, i: 0.0, d: 0 },
        summedError: 0,
      },
      speedPid: {
        gain: { p: 0, i: 0, d: 0 },
        summedError: 0,
      },
    },
  },
};

function getInitialState(initialController) {
  controlInitialState.autopilot.controllers.headingPid.gain =
    initialController.autopilot.controllers.headingPid.gain;

  controlInitialState.autopilot.controllers.speedPid.gain =
    initialController.autopilot.controllers.speedPid.gain;

  return controlInitialState;
}

export default getInitialState;
