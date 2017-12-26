import * as PubSub from 'pubsub-js';
import Thruster from './Thruster';
import GyroCompass from './GyroCompass';
import MRU from './MRU';
import WindSensor from './WindSensor';

class Ship {
  constructor() {
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

    this.simulationTimeToken = PubSub.subscribe('simulationTime', this.tick);
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.simulationTimeToken);
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

    PubSub.publish('thrusters', this.thrusters);
    PubSub.publish('windSensors', this.windSensors);
    PubSub.publish('mruSensors', this.mruSensors);
    PubSub.publish('gyrocompasses', this.gyrocompasses);
  }

  get thrusters() { return this._thrusters; }

  get windSensors() { return this._windSensors; }

  get mruSensors() { return this._mruSensors; }

  get gyrocompasses() { return this._gyrocompasses; }
}

export default Ship;
