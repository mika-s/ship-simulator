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
    displacement = displacement.toFixed(2);

    return displacement;
  }

  static calculateMass(displacement, lpp) {
    const r66 = (1 / 4) * lpp;

    const mass = {
      surge: 1.2 * displacement,
      sway: 1.8 * displacement,
      yaw: 0.5 * displacement * (r66 ** 2),
    };

    return mass;
  }

  static calculateDrag(lpp, breadth, draft) {
    const dragSurge = 0.05 * breadth * draft;
    const dragSway = 0.075 * lpp * draft;
    const dragYaw = (dragSway / (4 * lpp)) * (((lpp / 2.0) ** 4) + ((lpp / 2.0) ** 4));

    const expRatio = { surge: 0.5, sway: 0.6, yaw: 1.0 };

    const drag = {
      surge: expRatio.surge * dragSurge,
      sway: expRatio.sway * dragSway,
      yaw: expRatio.yaw * dragYaw,
    };

    return drag;
  }

  static transformNEDToBODY(nedPosition) {
    const { latitude, longitude, heading } = nedPosition;
    const headingInRad = heading * (Math.PI / 180.0);

    const surge = (Math.cos(headingInRad) * latitude) + (Math.sin(headingInRad) * longitude);
    const sway = -(Math.sin(headingInRad) * latitude) + (Math.cos(headingInRad) * longitude);

    return { surge, sway, heading };
  }

  static transformBODYToNED(bodyPostion) {
    const { surge, sway, heading } = bodyPostion;
    const headingInRad = heading * (Math.PI / 180.0);

    const latitude = (Math.cos(headingInRad) * surge) - (Math.sin(headingInRad) * sway);
    const longitude = (Math.sin(headingInRad) * surge) + (Math.cos(headingInRad) * sway);

    return { latitude, longitude, heading };
  }

  static transformTo0To360(angle) {
    return (angle % 360) + (angle < 0 ? 360 : 0);
  }
}

export default VesselUtil;
