import GeneralUtil from '../../util/GeneralUtil';

class VesselUtil {
  /**
  * Calculate the displacement of a vessel.
  * @param {object} dimensions       - Object containing:
  * @param {number} lpp              - Length between perpendiculars.
  * @param {number} breadth          - Breadth.
  * @param {number} draft            - Draft.
  * @param {number} blockCoefficient - The block coefficient.
  * @returns {number}                - The vessel's displacement in metric tons.
  */
  static calculateDisplacement(dimensions) {
    const {
      lpp, breadth, draft, blockCoefficient,
    } = dimensions;
    const rhoWater = 1.024;

    let displacement = rhoWater * blockCoefficient * lpp * breadth * draft;
    displacement = GeneralUtil.truncToDecimal(displacement, 2);

    return displacement;
  }

  /**
  * Calculate the mass (displacement + added mass) of a vessel in surge, sway and yaw.
  * @param {number} displacement     - The vessel's displacement.
  * @param {number} lpp              - Length between perpendiculars.
  * @returns {object}                - An object containing the vessel's mass.
  *                                  - fields: surge, sway, yaw.
  */
  static calculateMass(displacement, lpp) {
    // const r66 = (1 / 4) * lpp;

    const mass = {
      surge: 1.2 * displacement,
      sway: 1.8 * displacement,
      // yaw: 0.5 * displacement * (r66 ** 2),
      yaw: displacement * ((lpp / 3) ** 2),
    };

    return mass;
  }

  /**
  * Calculate the drag of a vessel in surge, sway and yaw.
  * @param {number} lpp       - Length between perpendiculars.
  * @param {number} breadth   - Breadth.
  * @param {number} draft     - Draft.
  * @returns {object}         - An object containing the vessel's drag.
  *                           - fields: surge, sway, yaw.
  */
  static calculateDrag(lpp, breadth, draft) {
    const dragSurge = 0.05 * breadth * draft;
    const dragSway = 0.075 * lpp * draft;
    const dragYaw = (dragSway / (4 * lpp)) * (((lpp / 2.0) ** 4) + ((lpp / 2.0) ** 4));

    const expRatio = { surge: 0.5, sway: 0.6, yaw: 0.5 };

    const drag = {
      surge: expRatio.surge * dragSurge,
      sway: expRatio.sway * dragSway,
      yaw: expRatio.yaw * dragYaw,
    };

    return drag;
  }

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

  /**
  * Calculate projected frontal wind area.
  * @param {number} breadth               - The vessel's breadth.
  * @param {number} superstructureHeight  - The height of the vessel's superstructure.
  * @returns {number}                     - The projected frontal area.
  */
  static calculateFrontalWindArea(breadth, superstructureHeight) {
    const areaCoefficient = 0.8;
    const frontalArea = areaCoefficient * breadth * superstructureHeight;

    return frontalArea;
  }

  /**
  * Calculate projected frontal wind area.
  * @param {number} loa                   - The vessel's length over all.
  * @param {number} superstructureHeight  - The height of the vessel's superstructure.
  * @returns {number}                     - The projected frontal area.
  */
  static calculateLateralWindArea(loa, superstructureHeight) {
    const areaCoefficient = 0.4;
    const lateralArea = areaCoefficient * loa * superstructureHeight;

    return lateralArea;
  }
}

export default VesselUtil;
