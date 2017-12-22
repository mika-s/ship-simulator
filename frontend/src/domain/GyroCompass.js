class GyroCompass {
  constructor() {
    this._heading = 0.0;

    this.calculateHeading = this.calculateHeading.bind(this);
  }

  calculateHeading(heading) {
    this._heading = heading;
  }

  get heading() { return this._heading; }
}

export default GyroCompass;
