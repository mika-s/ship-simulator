import * as PubSub from 'pubsub-js';
import GeneralUtil from './GeneralUtil';

class WindSensor {
  constructor(number) {
    this._number = number;
    this._speed = 0.0;
    this._direction = 0.0;
    this._modelSpeed = 0.0;
    this._modelDirection = 0.0;
    this._relativeSpeed = 0.0;
    this._relativeDirection = 0.0;
    this._vesselSpeed = 0.0;
    this._vesselSpeed = { u: 0.0, v: 0.0, r: 0.0 };

    this.updateVesselSpeed = this.updateVesselSpeed.bind(this);
    this.updateVesselHeading = this.updateVesselHeading.bind(this);
    this.updateWindValues = this.updateWindValues.bind(this);
    this.measureSpeed = this.measureSpeed.bind(this);
    this.measureDirection = this.measureDirection.bind(this);

    this.vesselVelocityToken = PubSub.subscribe('velocity', this.updateVesselSpeed);
    this.vesselVelocityToken = PubSub.subscribe('heading', this.updateVesselHeading);
    this.windValuesToken = PubSub.subscribe('wind', this.updateWindValues);
  }

  destruct() {
    PubSub.unsubscribe(this.vesselVelocityToken);
    PubSub.unsubscribe(this.windValuesToken);
  }

  updateVesselSpeed(msg, data) {
    this._vesselSpeed = data;

    // Add vessel velocity;
    let x = this._modelSpeed * Math.cos((
      this._modelDirection - this._vesselHeading) * (Math.PI / 180.0));

    let y = this._modelSpeed * Math.sin((
      this._modelDirection - this._vesselHeading) * (Math.PI / 180.0));

    x -= this._vesselSpeed.u;
    y -= this._vesselSpeed.v;

    this._relativeSpeed = Math.sqrt((x ** 2) + (y ** 2));
    this._relativeDirection = Math.atan2(y, x) * (180.0 / Math.PI);
  }

  updateVesselHeading(msg, data) {
    this._vesselHeading = data;
  }

  updateWindValues(msg, data) {
    this._modelSpeed = data.speed;
    this._modelDirection = data.direction;
  }

  measureSpeed() {
    const minSpeed = 0.0;
    const maxSpeed = 50.0;
    const minNoiseAmplitude = -0.5;
    const maxNoiseAmplitude = 0.5;

    // Add measurement noise.
    let newSpeed = this._relativeSpeed +
      GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

    // Apply clip limits.
    newSpeed = Math.min(newSpeed, maxSpeed);
    newSpeed = Math.max(newSpeed, minSpeed);

    // Remove unnecessary decimals. Keep 2.
    newSpeed = newSpeed.toFixed(2);

    this._speed = newSpeed;
  }

  measureDirection() {
    const minDirection = 0.0;
    const maxDirection = 360.0;
    const minNoiseAmplitude = -0.5;
    const maxNoiseAmplitude = 0.5;

    // Add measurement noise.
    let newDirection = this._relativeDirection +
      GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

    // Apply clip limits.
    newDirection = Math.min(newDirection, maxDirection);
    newDirection = Math.max(newDirection, minDirection);

    // Remove unnecessary decimals. Keep 2.
    newDirection = newDirection.toFixed(2);

    this._direction = newDirection;
  }

  get number() { return this._number; }

  get speed() { return this._speed; }

  get direction() { return this._direction; }
}

export default WindSensor;
