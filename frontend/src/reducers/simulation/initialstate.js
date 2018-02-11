import { simulationState } from '../../util/enums';

const simulatorInitialState = {
  time: 0,
  frequency: 1,
  simulationState: simulationState.STOPPED,
};

/**
* Get the initial state for the redux store for the simulation section.
* @returns {Object} The initial state for the simulation section.
*/
function getInitialState() {
  return simulatorInitialState;
}

export default getInitialState;
