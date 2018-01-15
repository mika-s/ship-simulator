const simulationState = { RUNNING: 1, PAUSED: 2, STOPPED: 3 };

const thrusterFeedbackState = {
  AT_POSITION: 1,
  INCREASING_BY_RT: 2,
  INCREASING_LT_RT: 3,
  DECREASING_BY_RT: 4,
  DECREASING_LT_RT: 5,
};

const motion = {
  TRUE: 1, RELATIVE: 2,
};

const vesselControlMode = { STANDBY: 1, LEVER: 2 };

export { simulationState, thrusterFeedbackState, motion, vesselControlMode };
