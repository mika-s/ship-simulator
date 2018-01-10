import blendermann from './blendermann';

class WindUtil {
  /**
  * Calculate the wind forces acting on a vessel.
  * @param {number} windSpeed     - Wind speed in m/s.
  * @param {number} windDirection - Wind direction in degrees.
  * @param {object} vesselSpeed   - Vessel speed object with u, v, and r in m/s.
  * @param {number} vesselHeading - Heading of the vessel in radians.
  * @param {object} dimensions    - Dimension object.
  * @param {object} windParams    - Wind parameter object.
  * @returns {object}             - Wind forces in surge, sway and yaw.
  */
  static calculateForces(
    windSpeed, windDirection,
    vesselSpeed, vesselHeading,
    dimensions, windParams,
  ) {
    const isherwoodParams = {
      superstructureArea: 'None',
      breadth: 'None',
      S: 'None',
      masts: 'None',
    };

    const windDirectionInRads = windDirection * (Math.PI / 180.0);

    const ρ = 1.225; // kg/m^3

    const cartWindSpeed = {
      surge: windSpeed * Math.cos(windDirectionInRads - vesselHeading),
      sway: windSpeed * Math.sin(windDirectionInRads - vesselHeading),
    };

    const relativeCartWindSpeed = {
      surge: vesselSpeed.u - cartWindSpeed.surge,
      sway: vesselSpeed.v - cartWindSpeed.sway,
    };

    const relativeWindSpeed =
      Math.sqrt((relativeCartWindSpeed.surge ** 2) + (relativeCartWindSpeed.sway ** 2));

    const angleOfAttack =
      Math.atan2(relativeCartWindSpeed.sway, relativeCartWindSpeed.surge) - Math.PI;

    let coefficients;

    if (windParams.coefficientCalcType === 'blendermann') {
      coefficients = blendermann(windParams, dimensions, angleOfAttack);
    } else if (windParams.coefficientCalcType === 'isherwood') {
      if (isherwoodParams.superstructureArea === 'None' || isherwoodParams.breadth === 'None' ||
        isherwoodParams.S === 'None' || isherwoodParams.masts === 'None') {
        throw new Error('Isherwood values have not been supplied.');
      }

      coefficients = WindUtil.isherwood(
        windParams.frontalArea,
        windParams.lateralArea,
        isherwoodParams.superstructureArea,
        dimensions.loa,
        dimensions.breadth,
        isherwoodParams.S,
        windParams.sL,
        isherwoodParams.masts,
        angleOfAttack,
      );
    } else {
      throw new Error('Wrong wind force calculation coefficient type supplied: ', windParams.coefficientCalcType);
    }

    const q = 0.5 * ρ * (relativeWindSpeed ** 2);

    return {
      surge: (10 ** -3) * q * coefficients.CX * windParams.frontalArea,
      sway: (10 ** -3) * q * coefficients.CY * windParams.lateralArea,
      yaw: (10 ** -3) * q * coefficients.CN * windParams.lateralArea * dimensions.loa,
    };
  }

  /**
  * Generate an object, containing two arrays, representing the
  * Norwegian Petroleum Directorate (NPD) wind spectrum, for a
  * given wind speed at 10 m.
  * @param {number} U10    - Mean wind speed in m/s at 10 m altitude.
  * @returns {object}      - An object containing two arrays:
  *                          frequencies and spectrum.
  */
  static generateNPD(U10) {
    const stepSize = 0.001;
    const n = 0.468;

    const spectrum = [];
    const frequencies = [];

    for (let frqIdx = 0; frqIdx < 1 / stepSize; frqIdx += 1) {
      frequencies.push(frqIdx * stepSize);
    }

    for (let frqIdx = 0; frqIdx < frequencies.length; frqIdx += 1) {
      const fBar = 172.0 * frequencies[frqIdx] * ((U10 / 10.0) ** -0.75);
      const numerator = (320.0 * ((U10 / 10.0) ** 2));
      const denominator = (1 + (fBar ** n)) ** (5 / (3 * n));
      spectrum.push(numerator / denominator);
    }

    return { frequencies, spectrum };
  }

  /**
  * Returns the mean wind speed at height z given the mean wind speed.
  * @param {number} U10    - Mean wind speed in m/s at 10 m altitude.
  * @param {number} C10    - Surface drag coefficient at 10 m altitude.
  * @param {number} z      - The altitude in m to calculate the mean wind speed for.
  * @returns {number}      - Mean wind speed in m/s at altitude z.
  */
  static U10toUz(U10, C10, z) {
    const uStar = Math.sqrt(C10 * U10);
    const Uz = U10 + (2.5 * uStar * Math.log(z / 10.0));

    return Uz;
  }
}

export default WindUtil;
