/**
 * Enum for simulation state.
 * @readonly
 * @enum {number}
 */
const simulationState = { RUNNING: 1, PAUSED: 2, STOPPED: 3 };

/**
 * Enum for feedback state of a thruster.
 * @readonly
 * @enum {number}
 */
const thrusterFeedbackState = {
  AT_POSITION: 1,
  INCREASING_BY_RT: 2,
  INCREASING_LT_RT: 3,
  DECREASING_BY_RT: 4,
  DECREASING_LT_RT: 5,
};

/**
 * Enum for motion type in the map.
 * @readonly
 * @enum {number}
 */
const motion = {
  TRUE: 1, RELATIVE: 2,
};

/**
 * Enum for the vessel's control mode.
 * @readonly
 * @enum {number}
 */
const vesselControlMode = {
  STANDBY: 1,
  TEST: 2,
  LEVER: 3,
  AUTOPILOT: 4,
};

export { simulationState, thrusterFeedbackState, motion, vesselControlMode };
