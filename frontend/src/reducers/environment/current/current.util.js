import KinematicsUtil from '../../../util/kinematics.util';
import { maxBasedTrigonometric } from './trigonometric';

class CurrentUtil {
  /**
  * Calculate the wind forces acting on a vessel.
  * @param {number} currentSpeed     - Current speed in m/s.
  * @param {number} currentDirection - Current direction in degrees.
  * @param {number} vesselHeading    - Heading of the vessel in radians.
  * @param {number} rotationSpeed    - Rotation speed of the vessel, in rad/s.
  * @param {object} dimensions       - Dimension object.
  * @param {object} drag             - The drag coefficients object.
  * @returns {object}                - Current forces in surge, sway and yaw.
  */
  static calculateForces(
    currentSpeed, currentDirection, vesselHeading, rotationSpeed,
    dimensions, drag,
  ) {
    const currentDirectionInRad = currentDirection * (Math.PI / 180.0);
    const ρ = 1024.0; // kg/m^3
    const g = 9.81; // m/s^2
    const frontalArea = dimensions.draft * dimensions.breadth;
    const lateralArea = dimensions.draft * dimensions.lpp;
    let relativeAngle = currentDirectionInRad - vesselHeading;
    relativeAngle = KinematicsUtil.transformTo0To2pi(relativeAngle);

    /* const coefficients = dragBasedTrigonometric(
      relativeAngle, drag,
      frontalArea, lateralArea, dimensions.loa,
    );
    */

    const max = { surge: 0.07, sway: 0.7, yaw: 0.5 };
    const coefficients = maxBasedTrigonometric(relativeAngle, max);

    const q = (10 ** -3) * (1 / g) * 0.5 * ρ * (currentSpeed ** 2);

    return {
      surge: q * coefficients.CX * frontalArea,
      sway: q * coefficients.CY * lateralArea,
      yaw: (q * coefficients.CN * lateralArea * dimensions.loa) - (drag.yaw * rotationSpeed),
    };
  }
}

export default CurrentUtil;
