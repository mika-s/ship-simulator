import { thrusterFeedbackState } from '../../util/enums';

class ThrusterUtil {
  static getForces(thruster) {
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

  static getPower(thruster) {
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

  static setDemand(thruster, demand) {
    return {
      ...demand,
      azimuth: ThrusterUtil.isAzi(thruster.thrusterType) ? demand.azimuth : 90.0,
    };
  }

  static getFeedback(thruster) {
    const newFeedback = { rpm: 0.0, pitch: 0.0 };
    const { controlType: type } = thruster;
    const { positive: rtPos, negative: rtNeg } = thruster.risetimes[type];

    const difference = thruster.demand[type] - thruster.feedback[type];
    const feedbackState = ThrusterUtil.getFeedbackState(difference, thruster.risetimes[type]);

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

    if (ThrusterUtil.isAzi(thruster.thrusterType)) {
      const aziDifference = thruster.demand.azimuth - thruster.feedback.azimuth;
      const aziFeedbackState =
        ThrusterUtil.getFeedbackState(aziDifference, thruster.risetimes.azimuth);
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

  /**
  * Return true if the thruster can change azimuth.
  * @param {string} thrusterType   - Type of thruster.
  * @returns {boolean}             - true if azimuth can be changed, false otherwise.
  */
  static isAzi(thrusterType) {
    return thrusterType === 'propeller' || thrusterType === 'azimuth';
  }

  /**
  * Get the state of the thruster feedback.
  * @param {string} thrusterType   - Type of thruster.
  * @returns {boolean}             - true if azimuth can be changed, false otherwise.
  */
  static getFeedbackState(difference, risetimes) {
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
    }

    return state;
  }
}

export default ThrusterUtil;
