import { vesselControlMode } from '../../util/enums';

const controlInitialState = {
  mode: vesselControlMode.LEVER,
};

function getInitialState() {
  return controlInitialState;
}

export default getInitialState;
