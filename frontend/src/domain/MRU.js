import GeneralUtil from './GeneralUtil';

class MRU {
  constructor(number) {
    this._number = number;
    this._roll = 0.0;
    this._pitch = 0.0;

    this.measureRoll = this.measureRoll.bind(this);
    this.measurePitch = this.measurePitch.bind(this);
  }

  measureRoll(roll) {
    const minRoll = -20.0;
    const maxRoll = 20.0;
    const minNoiseAmplitude = -0.05;
    const maxNoiseAmplitude = 0.05;

    // Add measurement noise.
    let newRoll = roll + GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

    // Apply clip limits.
    newRoll = Math.min(newRoll, maxRoll);
    newRoll = Math.max(newRoll, minRoll);

    // Remove unnecessary decimals. Keep 2.
    newRoll = newRoll.toFixed(2);

    this._roll = newRoll;
  }

  measurePitch(pitch) {
    const minPitch = -15.0;
    const maxPitch = 15.0;
    const minNoiseAmplitude = -0.05;
    const maxNoiseAmplitude = 0.05;

    let newPitch = pitch + GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

    // Apply clip limits.
    newPitch = Math.min(newPitch, maxPitch);
    newPitch = Math.max(newPitch, minPitch);

    // Remove unnecessary decimals. Keep 2.
    newPitch = newPitch.toFixed(2);

    this._pitch = newPitch;
  }

  get number() { return this._number; }

  get roll() { return this._roll; }

  get pitch() { return this._pitch; }
}

export default MRU;
