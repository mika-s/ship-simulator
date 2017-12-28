class ThrusterUtil {
  static assertConstructorInput(
    number, name, thrusterType, controlType,
    maxPowerPositive, maxPowerNegative,
    xPos, yPos, pitchExponentPositive, pitchExponentNegative,
  ) {
    const minThrusterNameLength = 1;
    const maxThrusterNameLength = 20;
    const minNumber = 1;
    const maxNumber = 20;
    const maxPowerLowLimit = 0.0;
    const maxPowerHighLimit = 20000.0;
    const minXPos = -200.0;
    const maxXPos = 200.0;
    const minYPos = -50.0;
    const maxYPos = 50.0;
    const minPitchExponent = 0.0;
    const maxPitchExponent = 2.5;

    if (typeof number !== 'number' || number < minNumber || maxNumber < number) {
      throw new Error(`Illegal thruster number: ${number}. Limits: lowest: ${minNumber}, highest: ${maxNumber}.`);
    }

    if (typeof name !== 'string' || name.length < minThrusterNameLength || maxThrusterNameLength < name.length) {
      throw new Error(`Illegal thruster name: ${name}. Limits: length: ${minThrusterNameLength}-${maxThrusterNameLength}.`);
    }

    if (thrusterType !== 'tunnel' && thrusterType !== 'azimuth' && thrusterType !== 'propeller' && thrusterType !== 'waterjet') {
      throw new Error('Illegal thruster type.');
    }

    if (thrusterType !== 'tunnel' && thrusterType !== 'azimuth' && thrusterType !== 'propeller' && thrusterType !== 'waterjet') {
      throw new Error('Illegal thruster type.');
    }

    if (controlType !== 'rpm' && controlType !== 'pitch') {
      throw new Error('Illegal control type.');
    }

    if (typeof maxPowerPositive !== 'number' || maxPowerPositive < maxPowerLowLimit || maxPowerHighLimit < maxPowerPositive) {
      throw new Error(`Max power positive is too low or too high. Limits: low: ${maxPowerLowLimit} kW, high: ${maxPowerHighLimit} kW.`);
    }

    if (typeof maxPowerNegative !== 'number' || maxPowerNegative < maxPowerLowLimit || maxPowerHighLimit < maxPowerNegative) {
      throw new Error(`Max power negative is too low or too high. Limits: low: ${maxPowerLowLimit} kW, high: ${maxPowerHighLimit} kW.`);
    }

    if (typeof xPos !== 'number' || xPos < minXPos || maxXPos < xPos) {
      throw new Error(`x position is too small or too large. Limits: ${minXPos} m to ${maxXPos} m.`);
    }

    if (typeof yPos !== 'number' || yPos < minYPos || maxYPos < yPos) {
      throw new Error(`y position is too small or too large. Limits: ${minYPos} m to ${maxYPos} m.`);
    }

    if (typeof pitchExponentPositive !== 'number' || pitchExponentPositive < minPitchExponent || maxPitchExponent < pitchExponentPositive) {
      throw new Error(`pitch exponent positive is too small or too large. Limits: ${minPitchExponent} to ${maxPitchExponent}.`);
    }

    if (typeof pitchExponentNegative !== 'number' || pitchExponentNegative < minPitchExponent || maxPitchExponent < pitchExponentNegative) {
      throw new Error(`pitch exponent negative is too small or too large. Limits: ${minPitchExponent} to ${maxPitchExponent}.`);
    }
  }

  /**
  * Calculate maximum force, both directions, using IMCA's rules.
  * @param {string} type              - Thruster type: tunnel, azimuth, propeller or waterjet.
  * @param {number} maxPowerPositive  - Maximum power, positive direction.
  * @param {number} maxPowerNegative  - Maximum power, negative direction.
  * @returns {object}                 - Object containing max force in pos. and neg. direction.
  * @returns {number}                 - Maximum force in positive direction.
  * @returns {number}                 - Maximum force in negative direction.
  */
  static calculateMaxForce(type, maxPowerPositive, maxPowerNegative) {
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

    const maxForcePositive = conversionFactorPositive * (maxPowerPositive / 9.81);
    const maxForceNegative = conversionFactorNegative * (maxPowerNegative / 9.81);

    return { maxForcePositive, maxForceNegative };
  }
}

export default ThrusterUtil;
