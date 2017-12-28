import ThrUtil from './ThrusterUtil';

class Thruster {
  constructor(
    number, name, thrusterType, controlType,
    maxPowerPositive, maxPowerNegative,
    xPos, yPos, pitchExponentPositive = 0.0, pitchExponentNegative = 0.0,
  ) {
    ThrUtil.assertConstructorInput(
      number, name, thrusterType, controlType,
      maxPowerPositive, maxPowerNegative,
      xPos, yPos, pitchExponentPositive, pitchExponentNegative,
    );

    this._number = number;
    this._name = name;
    this._thrusterType = thrusterType;
    this._controlType = controlType;
    this._maxPowerPositive = maxPowerPositive;
    this._maxPowerNegative = maxPowerNegative;
    this._xPos = xPos;
    this._yPos = yPos;
    this._pitchExponent = { positive: pitchExponentPositive, negative: pitchExponentNegative };
    this._rpmExponent = controlType === 'rpm' ? { positive: 2.0, negative: 2.0 } : { positive: 0.0, negative: 0.0 };

    const maxForces =
      ThrUtil.calculateMaxForce(thrusterType, maxPowerPositive, maxPowerNegative);

    this._maxForcePositive = maxForces.maxForcePositive;
    this._maxForceNegative = maxForces.maxForceNegative;

    this._force = 0.0;
    this._rpmDemand = 0.0;
    this._pitchDemand = 0.0;
    this._azimuthDemand = thrusterType === 'tunnel' ? 90.0 : 0.0;

    this.calculateForces = this.calculateForces.bind(this);
    this.calculatePower = this.calculatePower.bind(this);
  }

  calculateForces() {
    let newForce;

    if (this._rpmDemand >= 0.0) {
      newForce = this._maxForcePositive *
        (this._pitchDemand ** this._pitchExponent.positive) *
        (this._rpmDemand ** this._rpmExponent.positive);
    } else {
      newForce = this._maxForceNegative *
        (this._pitchDemand ** this._pitchExponent.negative) *
        (this._rpmDemand ** this._rpmExponent.negative);
    }

    this._force = newForce;
  }

  calculatePower() {
    let newPower;

    if (this._rpmDemand >= 0.0) {
      newPower = this._maxPowerPositive * (this._rpmDemand ** 3.0);
    } else {
      newPower = this._maxPowerNegative * (this._rpmDemand ** 3.0);
    }

    this._power = newPower;
  }

  get force() { return this._force; }

  get power() { return this._power; }

  get name() { return this._name; }

  get number() { return this._number; }

  get rpmDemand() { return this._rpmDemand; }

  set rpmDemand(value) {
    this._rpmDemand = value;
    this.calculateForces();
    this.calculatePower();
  }

  get pitchDemand() { return this._pitchDemand; }

  set pitchDemand(value) {
    this._pitchDemand = value;
    this.calculateForces();
    this.calculatePower();
  }

  get azimuthDemand() { return this._azimuthDemand; }

  get thrusterType() { return this._thrusterType; }

  get controlType() { return this._controlType; }
}

export default Thruster;
