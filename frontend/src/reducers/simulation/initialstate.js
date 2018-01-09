import { simulationState } from '../../util/enums';

const simulatorInitialState = {
  time: 0,
  simulationState: simulationState.STOPPED,
};

function getInitialState() {
  return simulatorInitialState;
}

export default getInitialState;
