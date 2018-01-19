import { vesselControlMode } from '../../util/enums';

const controlInitialState = {
  mode: vesselControlMode.AUTOPILOT,
  autopilot: {
    active: false,
    heading: 0.0,
    speed: 0.0,
  },
};

function getInitialState() {
  return controlInitialState;
}

export default getInitialState;
