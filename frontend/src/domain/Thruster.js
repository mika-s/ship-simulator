import ThrUtil from './ThrusterUtil';

class Thruster {
  constructor(
    number, name,
    thrusterType, controlType,
    maxPowerPositive, maxPowerNegative,
    xPos, yPos,
  ) {
    ThrUtil.assertConstructorInput(
      number, name, thrusterType, controlType,
      maxPowerPositive, maxPowerNegative,
      xPos, yPos,
    );

    this._number = number;
    this._name = name;
    this._thrusterType = thrusterType;
    this._controlType = controlType;
    this._maxPowerPositive = maxPowerPositive;
    this._maxPowerNegative = maxPowerNegative;
    this._xPos = xPos;
    this._yPos = yPos;

    const maxForces =
      ThrUtil.calculateMaxForce(thrusterType, maxPowerPositive, maxPowerNegative);

    this._maxForcePositive = maxForces.maxForcePositive;
    this._maxForceNegative = maxForces.maxForceNegative;

    this._rpmDemand = 0.0;
    this._pitchDemand = 0.0;
    this._azimuthDemand = thrusterType === 'tunnel' ? 90.0 : 0.0;

    this.calculateForces = this.calculateForces.bind(this);
    this.calculatePower = this.calculatePower.bind(this);
  }

  calculateForces() {
    let newForce;

    if (this._rpmDemand >= 0.0) {
      newForce = this._maxForcePositive * (this._rpmDemand ** 2.0);
    } else {
      newForce = this._maxForceNegative * (this._rpmDemand ** 2.0);
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

  get azimuthDemand() { return this._azimuthDemand; }

  get thrusterType() { return this._thrusterType; }

  get controlType() { return this._controlType; }
}

export default Thruster;
