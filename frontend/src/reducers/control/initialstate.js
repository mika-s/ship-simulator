import { vesselControlMode } from '../../util/enums';

const controlInitialState = {
  mode: vesselControlMode.AUTOPILOT,
  autopilot: {
    heading: 0.0,
  },
};

function getInitialState() {
  return controlInitialState;
}

export default getInitialState;
