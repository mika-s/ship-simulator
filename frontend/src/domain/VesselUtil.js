class VesselUtil {
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

  static calculateDrag(displacement, lpp) {
    const drag = {
      surge: 1.2 * displacement,
      sway: 1.8 * displacement,
      yaw: 60 * displacement,
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
}

export default VesselUtil;
