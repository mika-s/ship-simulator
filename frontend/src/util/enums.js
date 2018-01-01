const simulationState = { RUNNING: 1, PAUSED: 2, STOPPED: 3 };

const thrusterFeedbackState = {
  AT_POSITION: 1,
  INCREASING_BY_RT: 2,
  INCREASING_LT_RT: 3,
  DECREASING_BY_RT: 4,
  DECREASING_LT_RT: 5,
};

export { simulationState, thrusterFeedbackState };
