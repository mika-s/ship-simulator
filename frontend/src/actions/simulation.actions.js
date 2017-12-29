export function incrementSimulationTime() {
  return {
    type: 'INC_SIMULATION_TIME',
  };
}

export function pauseSimulationTime() {
  return {
    type: 'PAUSE_SIMULATION_TIME',
  };
}

export function stopSimulationTime() {
  return {
    type: 'STOP_SIMULATION_TIME',
  };
}

export function setSimulationState(state) {
  return {
    type: 'SET_SIMULATION_STATE',
    payload: {
      state,
    },
  };
}

