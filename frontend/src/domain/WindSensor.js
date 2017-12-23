import GeneralUtil from './GeneralUtil';

class WindSensor {
  constructor(number) {
    this._number = number;
    this._speed = 0.0;
    this._direction = 0.0;

    this.measureSpeed = this.measureSpeed.bind(this);
    this.measureDirection = this.measureDirection.bind(this);
  }

  measureSpeed(speed) {
    const minSpeed = 0.0;
    const maxSpeed = 50.0;
    const minNoiseAmplitude = -0.5;
    const maxNoiseAmplitude = 0.5;

    // Add measurement noise.
    let newSpeed = speed + GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

    // Apply clip limits.
    newSpeed = Math.min(newSpeed, maxSpeed);
    newSpeed = Math.max(newSpeed, minSpeed);

    // Remove unnecessary decimals. Keep 2.
    newSpeed = newSpeed.toFixed(2);

    this._speed = newSpeed;
  }

  measureDirection(direction) {
    this._direction = direction;
  }

  get number() { return this._number; }

  get speed() { return this._speed; }

  get direction() { return this._direction; }
}

export default WindSensor;
