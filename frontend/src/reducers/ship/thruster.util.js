import { thrusterFeedbackState } from '../../util/enums';
import KinematicsUtil from '../../util/kinematics.util';

class ThrusterUtil {
  /**
  * Get the thruster force.
  * @param {object} thruster   - The thruster object.
  * @returns {number}          - The force delivered by the thruster.
  */
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

  /**
  * Get the thruster power.
  * @param {object} thruster   - The thruster object.
  * @returns {number}          - The consumed power of the thruster.
  */
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

  /**
  * Set the thruster demands.
  * @param {object} thruster   - The thruster object.
  * @param {object} demand     - The demand object with demands in rpm, pitch and azimuth.
  * @returns {object}          - Object with thruster demands in rpm, pitch and azimuth.
  */
  static setDemand(thruster, demand) {
    return {
      ...demand,
      azimuth: ThrusterUtil.isAzi(thruster.thrusterType) ? demand.azimuth : 90.0,
    };
  }

  /**
  * Get the thruster feedbacks.
  * @param {object} thruster   - The thruster object.
  * @returns {object}          - Object with thruster feedback in rpm, pitch and azimuth.
  */
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

      // Find shortest distance.
      const ccw = aziDifference > 0 ? aziDifference - 360.0 : aziDifference;
      const cw = aziDifference > 0 ? aziDifference : 360 + aziDifference;
      const chosenAziDiff = Math.abs(ccw) < Math.abs(cw) ? ccw : cw;

      const aziFeedbackState =
        ThrusterUtil.getFeedbackState(chosenAziDiff, thruster.risetimes.azimuth);
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

    newFeedback.azimuth = KinematicsUtil.transformTo0To360(newFeedback.azimuth);

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
  * @param {number} difference   - Difference between demand and feedback.
  * @param {object} risetimes    - Object of risetimes.
  * @returns {enum}              - Demand/feedback state of the thruster.
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
    } else {
      throw new Error('Illegal state');
    }

    return state;
  }
}

export default ThrusterUtil;
