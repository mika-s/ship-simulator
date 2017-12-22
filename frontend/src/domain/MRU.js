class MRU {
  constructor() {
    this._roll = 0.0;
    this._pitch = 0.0;

    this.calculateRoll = this.calculateRoll.bind(this);
    this.calculatePitch = this.calculatePitch.bind(this);
  }

  calculateRoll(roll) {
    this._roll = roll;
  }

  calculatePitch(pitch) {
    this._pitch = pitch;
  }

  get roll() { return this._roll; }

  get pitch() { return this._pitch; }
}

export default MRU;
