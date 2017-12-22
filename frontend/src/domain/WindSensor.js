class WindSensor {
  constructor() {
    this._speed = 0.0;
    this._direction = 0.0;

    this.calculateSpeed = this.calculateSpeed.bind(this);
    this.calculateDirection = this.calculateDirection.bind(this);
  }

  calculateSpeed(speed) {
    this._speed = speed;
  }

  calculateDirection(direction) {
    this._direction = direction;
  }

  get speed() { return this._speed; }

  get direction() { return this._direction; }
}

export default WindSensor;
