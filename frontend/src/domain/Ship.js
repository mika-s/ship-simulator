import * as PubSub from 'pubsub-js';
import Thruster from './Thruster';
import GyroCompass from './GyroCompass';
import MRU from './MRU';
import WindSensor from './WindSensor';

class Ship {
  constructor() {
    this._simulationTime = 0;

    this._thrusters = [
      new Thruster('Tunnel', 1, 'tunnel', 'rpm', 800.0, 800.0),
      new Thruster('Port prop', 2, 'propeller', 'rpm', 2000.0, 1500.0),
      new Thruster('Stbd prop', 3, 'propeller', 'rpm', 2000.0, 1500.0),
    ];

    this._windSensors = [
      new WindSensor(1),
      new WindSensor(2),
    ];

    this._mruSensors = [
      new MRU(1),
    ];

    this._gyrocompasses = [
      new GyroCompass(1),
    ];

    this.tick = this.tick.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
  }

  tick() {
    for (let thrIdx = 0; thrIdx < this._thrusters.length; thrIdx += 1) {
      this.thrusters[thrIdx].calculateForces(0.5);
      this.thrusters[thrIdx].calculatePower(0.5);
    }

    for (let wsIdx = 0; wsIdx < this._windSensors.length; wsIdx += 1) {
      this._windSensors[wsIdx].measureSpeed(0.5);
      this._windSensors[wsIdx].measureDirection(0.5);
    }

    for (let mruIdx = 0; mruIdx < this._mruSensors.length; mruIdx += 1) {
      this._mruSensors[mruIdx].measureRoll(0.5);
      this._mruSensors[mruIdx].measurePitch(0.5);
    }

    for (let gyroIdx = 0; gyroIdx < this._gyrocompasses.length; gyroIdx += 1) {
      this._gyrocompasses[gyroIdx].measureHeading(0.5);
    }

    this.simulationTime += 1;
    PubSub.publish('thrusters', this.thrusters);
    PubSub.publish('windSensors', this.windSensors);
    PubSub.publish('mruSensors', this.mruSensors);
    PubSub.publish('gyrocompasses', this.gyrocompasses);
  }

  get simulationTime() { return this._simulationTime; }

  set simulationTime(value) {
    this._simulationTime = value;
    PubSub.publish('simulationTime', this.simulationTime);
  }

  get thrusters() { return this._thrusters; }

  get windSensors() { return this._windSensors; }

  get mruSensors() { return this._mruSensors; }

  get gyrocompasses() { return this._gyrocompasses; }

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
