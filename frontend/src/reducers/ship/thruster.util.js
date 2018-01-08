import { thrusterFeedbackState } from '../../util/enums';

class ThrusterUtil {
  /**
  * Calculate maximum force, both directions, using IMCA's rules.
  * @param {string} type              - Thruster type: tunnel, azimuth, propeller or waterjet.
  * @param {object} maxPowerPositive  - Maximum power, positive and negative direction.
  * @returns {object}                 - Object containing max force in pos. and neg. direction.
  * @returns {number}                 - Maximum force in positive direction.
  * @returns {number}                 - Maximum force in negative direction.
  */
  static calculateMaxForce(type, maxPower) {
    const grav = 9.81;
    const hpPerKw = 1.36332;

    let conversionFactorPositive;
    let conversionFactorNegative;

    if (type === 'tunnel') {
      conversionFactorPositive = 11.0 * (10 ** -3) * hpPerKw * grav;
      conversionFactorNegative = -11.0 * (10 ** -3) * hpPerKw * grav;
    } else if (type === 'azimuth') {
      conversionFactorPositive = 13.0 * (10 ** -3) * hpPerKw * grav;
      conversionFactorNegative = -8.0 * (10 ** -3) * hpPerKw * grav;
    } else if (type === 'propeller') {
      conversionFactorPositive = 13.0 * (10 ** -3) * hpPerKw * grav;
      conversionFactorNegative = -0.7 * conversionFactorPositive;
    } else if (type === 'waterjet') {
      conversionFactorPositive = 8.0 * (10 ** -3) * hpPerKw * grav;
      conversionFactorNegative = 0.0;
    } else {
      throw new Error('Illegal thruster type.');
    }

    const maxForcePositive = conversionFactorPositive * (maxPower.positive / 9.81);
    const maxForceNegative = conversionFactorNegative * (maxPower.negative / 9.81);

    return { positive: maxForcePositive, negative: maxForceNegative };
  }

  /**
  * Convert risetimes from %/s and °/s to factor/s.
  * @param {object} risetimes   - The risetimes object.
  * @returns {object}           - The risetimes object with converted values.
  */
  static normalizeRisetimes(risetimes) {
    const convertedRisetimes = JSON.parse(JSON.stringify(risetimes));

    if (convertedRisetimes.rpm) {
      convertedRisetimes.rpm.positive /= 100.0;
      convertedRisetimes.rpm.negative /= 100.0;
    }

    if (convertedRisetimes.pitch) {
      convertedRisetimes.pitch.positive /= 100.0;
      convertedRisetimes.pitch.negative /= 100.0;
    }

    return convertedRisetimes;
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
