import ThrUtil from './ThrusterUtil';

class Thruster {
  constructor(number, name, thrusterType, controlType, maxPowerPositive, maxPowerNegative) {
    ThrUtil.assertConstructorInput(
      number, name, thrusterType, controlType,
      maxPowerPositive, maxPowerNegative,
    );

    this._number = number;
    this._name = name;
    this._thrusterType = thrusterType;
    this._controlType = controlType;
    this._maxPowerPositive = maxPowerPositive;
    this._maxPowerNegative = maxPowerNegative;

    const maxForces =
      ThrUtil.calculateMaxForce(thrusterType, maxPowerPositive, maxPowerNegative);

    this._maxForcePositive = maxForces.maxForcePositive;
    this._maxForceNegative = maxForces.maxForceNegative;

    this._demand = 0.0;

    this.calculateForces = this.calculateForces.bind(this);
    this.calculatePower = this.calculatePower.bind(this);
  }

  calculateForces() {
    let newForce;

    if (this._demand >= 0.0) {
      newForce = this._maxForcePositive * (this._demand ** 2.0);
    } else {
      newForce = this._maxForceNegative * (this._demand ** 2.0);
    }

    newForce = newForce.toFixed(2);
    this._force = newForce;
  }

  calculatePower() {
    let newPower;

    if (this._demand >= 0.0) {
      newPower = this._maxPowerPositive * (this._demand ** 3.0);
    } else {
      newPower = this._maxPowerNegative * (this._demand ** 3.0);
    }

    newPower = newPower.toFixed(2);
    this._power = newPower;
  }

  get force() { return this._force; }

  get power() { return this._power; }

  get name() { return this._name; }

  get number() { return this._number; }

  get demand() { return this._demand; }

  set demand(value) {
    this._demand = value;
    this.calculateForces();
    this.calculatePower();
  }

  get thrusterType() { return this._thrusterType; }

  get controlType() { return this._controlType; }
}

export default Thruster;
