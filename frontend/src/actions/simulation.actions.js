export function simulate() {
  return {
    type: 'SIMULATE',
  };
}

export function pauseSimulation() {
  return {
    type: 'PAUSE_SIMULATION',
  };
}

export function stopSimulation() {
  return {
    type: 'STOP_SIMULATION',
  };
}
