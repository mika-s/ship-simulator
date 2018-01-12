class KinematicsUtil {
  /**
  * Transform from NED to BODY. I.e. latitude, longitude, heading to surge, sway, heading.
  * @param {object} bodyPostion   - Object containing latitude, longitude, heading (rad).
  * @returns {object}             - Object containing surge, sway, heading.
  */
  static transformNEDToBODY(nedPosition) {
    const { latitude, longitude, heading } = nedPosition;

    const surge = (Math.cos(heading) * latitude) + (Math.sin(heading) * longitude);
    const sway = -(Math.sin(heading) * latitude) + (Math.cos(heading) * longitude);

    return { surge, sway, heading };
  }

  /**
  * Transform from BODY to NED. I.e. surge, sway, heading to latitude, longitude, heading.
  * @param {object} bodyPostion   - Object containing surge (m), sway (m), heading (rad).
  * @returns {object}             - Object containing latitude, longitude, heading.
  */
  static transformBODYToNED(bodyPostion) {
    const { surge, sway, heading } = bodyPostion;

    const latitude = (Math.cos(heading) * surge) - (Math.sin(heading) * sway);
    const longitude = (Math.sin(heading) * surge) + (Math.cos(heading) * sway);

    return { latitude, longitude, heading };
  }

  /**
  * Transform an angle in the range -Inf,Inf to 0,360°.
  * @param {number} angle     - The angle to transform.
  * @returns {number}         - The angle transformed.
  */
  static transformTo0To360(angle) {
    return (angle % 360) + (angle < 0 ? 360 : 0);
  }

  /**
  * Transform an angle in the range -Inf,Inf to 0,2π.
  * @param {number} angle     - The angle to transform.
  * @returns {number}         - The angle transformed.
  */
  static transformTo0To2pi(angle) {
    return (angle % (2 * Math.PI)) + (angle < 0 ? (2 * Math.PI) : 0);
  }
}

export default KinematicsUtil;
