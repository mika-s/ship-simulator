import * as PubSub from 'pubsub-js';
import Thruster from './Thruster';
import GyroCompass from './GyroCompass';
import MRU from './MRU';
import WindSensor from './WindSensor';

class Ship {
  constructor() {
    this._simulationTime = 0;

    this._thrusters = [
      new Thruster('tunnel', 'rpm', 800.0, 800.0),
      new Thruster('propeller', 'rpm', 2000.0, 1500.0),
      new Thruster('propeller', 'rpm', 2000.0, 1500.0),
    ];

    this._windSensors = [
      new WindSensor(),
      new WindSensor(),
    ];

    this._mruSensors = [
      new MRU(),
    ];

    this._gyrocompasses = [
      new GyroCompass(),
    ];

    this.tick = this.tick.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
  }

  tick() {
    for (let thrIdx = 0; thrIdx < this._thrusters.length; thrIdx += 1) {
      this._thrusters[thrIdx].calculateForce(0.5);
      this._thrusters[thrIdx].calculatePower(0.5);
    }

    for (let wsIdx = 0; wsIdx < this._windSensors.length; wsIdx += 1) {
      this._windSensors[wsIdx].calculateSpeed(0.5);
      this._windSensors[wsIdx].calculateDirection(0.5);
    }

    for (let mruIdx = 0; mruIdx < this._mruSensors.length; mruIdx += 1) {
      this._mruSensors[mruIdx].calculateRoll(0.5);
      this._mruSensors[mruIdx].calculatePitch(0.5);
    }

    for (let gyroIdx = 0; gyroIdx < this._gyrocompasses.length; gyroIdx += 1) {
      this._gyrocompasses[gyroIdx].calculateHeading(0.5);
    }

    this.simulationTime += 1;
  }

  get simulationTime() { return this._simulationTime; }

  set simulationTime(value) {
    this._simulationTime = value;
    PubSub.publish('simulationTime', this.simulationTime);
  }

  start() {
    this._timerID = setInterval(
      () => this.tick(),
      1000,
    );
  }

  pause() {
    clearInterval(this._timerID);
  }

  stop() {
    clearInterval(this._timerID);
    this.simulationTime = 0;
  }
}

export default Ship;
