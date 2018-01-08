import ThrUtil from './thruster.util';
import { thrusterFeedbackState } from '../../util/enums';

function getForces(thruster) {
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

function getPower(thruster) {
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

function setDemand(thruster, demand) {
  return {
    ...demand,
    azimuth: ThrUtil.isAzi(thruster.thrusterType) ? demand.azimuth : 90.0,
  };
}

function getFeedback(thruster) {
  const newFeedback = { rpm: 0.0, pitch: 0.0 };
  const { controlType: type } = thruster;
  const { positive: rtPos, negative: rtNeg } = thruster.risetimes[type];

  const difference = thruster.demand[type] - thruster.feedback[type];
  const feedbackState = ThrUtil.getFeedbackState(difference, thruster.risetimes[type]);

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
      throw new Error('Illegal feedback state for the thruster.');
  }

  if (ThrUtil.isAzi(thruster.thrusterType)) {
    const aziDifference = thruster.demand.azimuth - thruster.feedback.azimuth;
    const aziFeedbackState = ThrUtil.getFeedbackState(aziDifference, thruster.risetimes.azimuth);
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
        throw new Error('Illegal feedback state for the thruster.');
    }
  } else {
    newFeedback.azimuth = thruster.feedback.azimuth;
  }

  return newFeedback;
}

export default function thrusterReducer(state, action, demand) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        demand: setDemand(state, demand),
        feedback: getFeedback(state),
        force: getForces(state),
        power: getPower(state),
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        demand: {
          rpm: 0.0,
          pitch: 0.0,
          azimuth: ThrUtil.isAzi(state.thrusterType) ? state.demand.azimuth : 0.0,
        },
        feedback: {
          rpm: 0.0,
          pitch: 0.0,
          azimuth: ThrUtil.isAzi(state.thrusterType) ? state.feedback.azimuth : 0.0,
        },
        force: 0.0,
        power: 0.0,
      };
    default:
      return state;
  }
}
