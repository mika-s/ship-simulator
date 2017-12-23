import GeneralUtil from './GeneralUtil';

class GyroCompass {
  constructor(number) {
    this._number = number;
    this._heading = 0.0;

    this.measureHeading = this.measureHeading.bind(this);
  }

  measureHeading(heading) {
    const minHeading = 0.0;
    const maxHeading = 360.0;
    const minNoiseAmplitude = -0.5;
    const maxNoiseAmplitude = 0.5;

    // Add measurement noise.
    let newHeading = heading + GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

    // Apply clip limits.
    newHeading = Math.min(newHeading, maxHeading);
    newHeading = Math.max(newHeading, minHeading);

    // Remove unnecessary decimals. Keep 1.
    newHeading = newHeading.toFixed(1);

    this._heading = newHeading;
  }

  get number() { return this._number; }

  get heading() { return this._heading; }
}

export default GyroCompass;
