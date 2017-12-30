class Thruster {
  static calculate(thruster) {
    const newThruster = Object.assign({}, thruster);

    newThruster.force = Thruster.calculateForces(thruster);
    newThruster.power = Thruster.calculatePower(thruster);

    return newThruster;
  }

  static calculateForces(thruster) {
    let newForce;

    if (thruster.rpmDemand >= 0.0) {
      newForce = thruster.maxForcePositive *
        (thruster.pitchDemand ** thruster.pitchExponent.positive) *
        (thruster.rpmDemand ** thruster.rpmExponent.positive);
    } else {
      newForce = thruster.maxForceNegative *
        (thruster.pitchDemand ** thruster.pitchExponent.negative) *
        (thruster.rpmDemand ** thruster.rpmExponent.negative);
    }

    return newForce;
  }

  static calculatePower(thruster) {
    let newPower;

    if (thruster.rpmDemand >= 0.0) {
      newPower = thruster.maxPowerPositive * (thruster.rpmDemand ** 3.0);
    } else {
      newPower = thruster.maxPowerNegative * (thruster.rpmDemand ** 3.0);
    }

    return newPower;
  }
}

export default Thruster;
