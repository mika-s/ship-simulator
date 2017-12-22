class ThrusterUtil {
  static assertConstructorInput(thrusterType, controlType, maxPowerPositive, maxPowerNegative) {
    const maxPowerLowLimit = 0.0;
    const maxPowerHighLimit = 20000.0;

    if (thrusterType !== 'tunnel' && thrusterType !== 'azimuth' && thrusterType !== 'propeller' && thrusterType !== 'waterjet') {
      throw new Error('Illegal thruster type.');
    }

    if (controlType !== 'rpm' && controlType !== 'pitch') {
      throw new Error('Illegal control type.');
    }

    if (maxPowerPositive < maxPowerLowLimit || maxPowerHighLimit < maxPowerPositive) {
      throw new Error(`Max power positive is too low or too high. Limits: low: ${maxPowerLowLimit} kW, high: ${maxPowerHighLimit} kW.`);
    }

    if (maxPowerNegative < maxPowerLowLimit || maxPowerHighLimit < maxPowerNegative) {
      throw new Error(`Max power positive is too low or too high. Limits: low: ${maxPowerLowLimit} kW, high: ${maxPowerHighLimit} kW.`);
    }
  }

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

    const maxForcePositive = conversionFactorPositive * maxPowerPositive;
    const maxForceNegative = conversionFactorNegative * maxPowerNegative;

    return { maxForcePositive, maxForceNegative };
  }
}

export default ThrusterUtil;
