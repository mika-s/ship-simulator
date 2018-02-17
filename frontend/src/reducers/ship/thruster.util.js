import { thrusterFeedbackState } from '../../util/enums';
import { wrapTo0To360 } from '../../util/kinematics.util';

/**
* Get the thruster force.
* @param {Object} thruster   - The thruster object.
* @returns {number} The force delivered by the thruster.
*/
export function getForces(thruster) {
  let rpmPart;
  let pitchPart;

  if (thruster.feedback.rpm >= 0.0) {
    rpmPart = thruster.feedback.rpm ** thruster.rpmExponent.positive;
  } else {
    rpmPart = Math.abs(thruster.feedback.rpm) ** thruster.rpmExponent.negative;
  }

  if (thruster.feedback.pitch >= 0.0) {
    pitchPart = thruster.feedback.pitch ** thruster.pitchExponent.positive;
  } else {
    pitchPart = Math.abs(thruster.feedback.pitch) ** thruster.pitchExponent.negative;
  }

  let newForce;

  if (thruster.controlType === 'rpm' && thruster.feedback.rpm >= 0.0) {
    newForce = thruster.maxForce.positive * pitchPart * rpmPart;
  } else if (thruster.controlType === 'rpm' && thruster.feedback.rpm < 0.0) {
    newForce = thruster.maxForce.negative * pitchPart * rpmPart;
  } else if (thruster.controlType === 'pitch' && thruster.feedback.pitch >= 0.0) {
    newForce = thruster.maxForce.positive * pitchPart * rpmPart;
  } else if (thruster.controlType === 'pitch' && thruster.feedback.pitch < 0.0) {
    newForce = thruster.maxForce.negative * pitchPart * rpmPart;
  } else {
    throw new Error('Error in force state.');
  }

  return newForce;
}

/**
* Get the thruster power.
* @param {Object} thruster   - The thruster object.
* @returns {number} The consumed power of the thruster.
*/
export function getPower(thruster) {
  let rpmPart;
  let pitchPart;

  if (thruster.feedback.rpm >= 0.0) {
    rpmPart = thruster.feedback.rpm ** thruster.rpmPowerExponent.positive;
  } else {
    rpmPart = Math.abs(thruster.feedback.rpm) ** thruster.rpmPowerExponent.negative;
  }

  if (thruster.feedback.pitch >= 0.0) {
    pitchPart = thruster.feedback.pitch ** thruster.pitchPowerExponent.positive;
  } else {
    pitchPart = Math.abs(thruster.feedback.pitch) ** thruster.pitchPowerExponent.negative;
  }

  let newPower;

  if (thruster.controlType === 'rpm' && thruster.feedback.rpm >= 0.0) {
    newPower = thruster.maxPower.positive * pitchPart * rpmPart;
  } else if (thruster.controlType === 'rpm' && thruster.feedback.rpm < 0.0) {
    newPower = thruster.maxPower.negative * pitchPart * rpmPart;
  } else if (thruster.controlType === 'pitch' && thruster.feedback.pitch >= 0.0) {
    newPower = thruster.maxPower.positive * pitchPart * rpmPart;
  } else if (thruster.controlType === 'pitch' && thruster.feedback.pitch < 0.0) {
    newPower = thruster.maxPower.negative * pitchPart * rpmPart;
  } else {
    throw new Error('Error in power state.');
  }

  return newPower;
}

/**
* Return true if the thruster can change azimuth.
* @param {string} thrusterType   - Type of thruster.
* @returns {boolean} true if azimuth can be changed, false otherwise.
*/
export function isAzi(thrusterType) {
  return thrusterType === 'propeller' || thrusterType === 'azimuth';
}

/**
* Get the state of the thruster feedback.
* @param {number} difference   - Difference between demand and feedback.
* @param {Object} risetimes    - Object of risetimes.
* @returns {enum} Demand/feedback state of the thruster.
*/
function getFeedbackState(difference, risetimes) {
  const { positive: rtPos, negative: rtNeg } = risetimes;

  let state;

  if (difference === 0) {
    state = thrusterFeedbackState.AT_POSITION;
  } else if (difference > 0 && difference > rtPos) {
    state = thrusterFeedbackState.INCREASING_BY_RT;
  } else if (difference > 0 && difference <= rtPos) {
    state = thrusterFeedbackState.INCREASING_LT_RT;
  } else if (difference < 0 && difference < rtNeg) {
    state = thrusterFeedbackState.DECREASING_BY_RT;
  } else if (difference < 0 && difference >= rtNeg) {
    state = thrusterFeedbackState.DECREASING_LT_RT;
  } else {
    throw new Error(`Illegal state: ${difference}, ${rtPos}, ${rtNeg}.`);
  }

  return state;
}

/**
* Set the thruster demands.
* @param {Object} thruster   - The thruster object.
* @param {Object} demand     - The demand object with demands in rpm, pitch and azimuth.
* @returns {Object} Object with thruster demands in rpm, pitch and azimuth.
*/
export function setDemand(thruster, demand) {
  return {
    ...demand,
    azimuth: isAzi(thruster.thrusterType) ? demand.azimuth : 90.0,
  };
}

/**
* Get the thruster feedbacks.
* @param {Object} thruster   - The thruster object.
* @returns {Object} Object with thruster feedback in rpm, pitch and azimuth.
*/
export function getFeedback(thruster) {
  const newFeedback = { rpm: 0.0, pitch: 0.0 };
  const { controlType: type } = thruster;
  const { positive: rtPos, negative: rtNeg } = thruster.risetimes[type];

  const difference = thruster.demand[type] - thruster.feedback[type];
  const feedbackState = getFeedbackState(difference, thruster.risetimes[type]);

  switch (feedbackState) {
    case thrusterFeedbackState.AT_POSITION:
      newFeedback[type] = thruster.feedback[type];
      break;
    case thrusterFeedbackState.INCREASING_BY_RT:
      newFeedback[type] = thruster.feedback[type] + rtPos;
      break;
    case thrusterFeedbackState.INCREASING_LT_RT:
      newFeedback[type] = thruster.demand[type];
      break;
    case thrusterFeedbackState.DECREASING_BY_RT:
      newFeedback[type] = thruster.feedback[type] + rtNeg;
      break;
    case thrusterFeedbackState.DECREASING_LT_RT:
      newFeedback[type] = thruster.demand[type];
      break;
    default:
      throw new Error(`Illegal feedback state for the thruster: ${feedbackState}.`);
  }

  if (isAzi(thruster.thrusterType)) {
    const aziDifference = thruster.demand.azimuth - thruster.feedback.azimuth;

    // Find shortest distance.
    const ccw = aziDifference > 0 ? aziDifference - 360.0 : aziDifference;
    const cw = aziDifference > 0 ? aziDifference : 360 + aziDifference;
    const chosenAziDiff = Math.abs(ccw) < Math.abs(cw) ? ccw : cw;

    const aziFeedbackState =
      getFeedbackState(chosenAziDiff, thruster.risetimes.azimuth);
    const { positive: rtPosAzi, negative: rtNegAzi } = thruster.risetimes.azimuth;

    switch (aziFeedbackState) {
      case thrusterFeedbackState.AT_POSITION:
        newFeedback.azimuth = thruster.feedback.azimuth;
        break;
      case thrusterFeedbackState.INCREASING_BY_RT:
        newFeedback.azimuth = thruster.feedback.azimuth + rtPosAzi;
        break;
      case thrusterFeedbackState.INCREASING_LT_RT:
        newFeedback.azimuth = thruster.demand.azimuth;
        break;
      case thrusterFeedbackState.DECREASING_BY_RT:
        newFeedback.azimuth = thruster.feedback.azimuth + rtNegAzi;
        break;
      case thrusterFeedbackState.DECREASING_LT_RT:
        newFeedback.azimuth = thruster.demand.azimuth;
        break;
      default:
        throw new Error(`Illegal feedback state for the thruster: ${aziFeedbackState}.`);
    }
  } else {
    newFeedback.azimuth = thruster.feedback.azimuth;
  }

  newFeedback.azimuth = wrapTo0To360(newFeedback.azimuth);

  return newFeedback;
}
