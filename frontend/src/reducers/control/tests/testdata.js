import { vesselControlMode } from '../../../util/enums';

const controllerdata = {
  mode: vesselControlMode.AUTOPILOT,
  autopilot: {
    active: false,
    heading: 0.0,
    speed: 0.0,
    maxRudderAngle: 30.0,
    controllers: {
      headingPid: {
        gain: { p: 1, i: 0.001, d: 1 },
        summedError: 0,
        antiWindup: {
          sector: 0.0,
          maxI: 0.0,
        },
      },
      speedPid: {
        gain: { p: 5, i: 1, d: 1 },
        summedError: 0.0,
      },
    },
  },
};

export default controllerdata;
