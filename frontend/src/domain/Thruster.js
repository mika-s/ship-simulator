import ThrUtil from './ThrusterUtil';

class Thruster {
  constructor(thrusterType, controlType, maxPowerPositive, maxPowerNegative) {
    ThrUtil.assertConstructorInput(thrusterType, controlType, maxPowerPositive, maxPowerNegative);

    this._thrusterType = thrusterType;
    this._controlType = controlType;
    this._maxPowerPositive = maxPowerPositive;
    this._maxPowerNegative = maxPowerNegative;

    const maxForces = ThrUtil.calculateMaxForce(thrusterType, maxPowerPositive, maxPowerNegative);
    this._maxForcePositive = maxForces.maxForcePositive;
    this._maxForceNegative = maxForces.maxForceNegative;

    this.calculateForces = this.calculateForce.bind(this);
    this.calculatePower = this.calculatePower.bind(this);
  }

  calculateForce(demand) {
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
}

export default Thruster;
