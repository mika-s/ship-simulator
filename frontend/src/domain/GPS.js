import * as PubSub from 'pubsub-js';
import GeneralUtil from './GeneralUtil';

class GPS {
  constructor(number, initialLatitude, initialLongitude) {
    this._number = number;
    this._latitude = initialLatitude;
    this._longitude = initialLongitude;

    this.tick = this.tick.bind(this);
    this.headingToken = PubSub.subscribe('position', this.tick);
  }

  tick(msg, data) {
    this._modelLatitude = data.latitude;
    this._modelLongitude = data.longitude;
  }

  measurePosition() {
    const minLatitude = -1000; // -90.0;
    const maxLatitude = 1000; // 90.0;
    const minLongitude = -1000; // -180.0;
    const maxLongitude = 1000; // 180.0;
    const minNoiseAmplitude = -0.005;
    const maxNoiseAmplitude = 0.005;

    // Add measurement noise.
    let newLatitude = this._modelLatitude +
      GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

    let newLongitude = this._modelLongitude +
      GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

    // Apply clip limits.
    newLatitude = Math.min(newLatitude, maxLatitude);
    newLatitude = Math.max(newLatitude, minLatitude);

    newLongitude = Math.min(newLongitude, maxLongitude);
    newLongitude = Math.max(newLongitude, minLongitude);

    // Remove unnecessary decimals. Keep 3.
    newLatitude = newLatitude.toFixed(3);
    newLongitude = newLongitude.toFixed(3);

    this._latitude = newLatitude;
    this._longitude = newLongitude;
  }

  get number() { return this._number; }

  get latitude() { return this._latitude; }

  get longitude() { return this._longitude; }
}

export default GPS;
