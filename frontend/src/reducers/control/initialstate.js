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
};

function getInitialState() {
  return controlInitialState;
}

export default getInitialState;
