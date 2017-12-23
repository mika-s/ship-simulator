import ThrUtil from './ThrusterUtil';

class Thruster {
  constructor(name, number, thrusterType, controlType, maxPowerPositive, maxPowerNegative) {
    ThrUtil.assertConstructorInput(
      name, number, thrusterType, controlType,
      maxPowerPositive, maxPowerNegative,
    );

    this._name = name;
    this._number = number;
    this._thrusterType = thrusterType;
    this._controlType = controlType;
    this._maxPowerPositive = maxPowerPositive;
    this._maxPowerNegative = maxPowerNegative;

    const maxForces =
      ThrUtil.calculateMaxForce(thrusterType, maxPowerPositive, maxPowerNegative);

    this._maxForcePositive = maxForces.maxForcePositive;
    this._maxForceNegative = maxForces.maxForceNegative;

    this.calculateForces = this.calculateForces.bind(this);
    this.calculatePower = this.calculatePower.bind(this);
  }

  calculateForces(demand) {
    if (demand >= 0.0) {
      this._force = this._maxForcePositive * (demand ** 2.0);
    } else {
      this._force = this._maxForceNegative * (demand ** 2.0);
    }
  }

  calculatePower(demand) {
    if (demand >= 0.0) {
      this._power = this._maxPowerPositive * (demand ** 3.0);
    } else {
      this._power = this._maxPowerNegative * (demand ** 3.0);
    }
  }

  get force() { return this._force; }

  get power() { return this._power; }

  get name() { return this._name; }

  get number() { return this._number; }

  get thrusterType() { return this._thrusterType; }

  get controlType() { return this._controlType; }
}

export default Thruster;
