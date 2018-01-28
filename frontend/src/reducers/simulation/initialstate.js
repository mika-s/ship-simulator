import { simulationState } from '../../util/enums';

const simulatorInitialState = {
  time: 0,
  frequency: 1,
  simulationState: simulationState.STOPPED,
};

function getInitialState() {
  return simulatorInitialState;
}

export default getInitialState;
