import * as PubSub from 'pubsub-js';
import GeneralUtil from './GeneralUtil';

class GyroCompass {
  constructor(number) {
    this._number = number;
    this._heading = 0.0;
    this._modelHeading = 0.0;

    this.tick = this.tick.bind(this);
    this.measureHeading = this.measureHeading.bind(this);

    this.headingToken = PubSub.subscribe('heading', this.tick);
  }

  tick(msg, data) {
    this._modelHeading = data;
  }

  measureHeading() {
    const minHeading = 0.0;
    const maxHeading = 360.0;
    const minNoiseAmplitude = -0.5;
    const maxNoiseAmplitude = 0.5;

    // Add measurement noise.
    let newHeading = this._modelHeading +
      GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

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
