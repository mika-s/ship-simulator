import * as PubSub from 'pubsub-js';
import Thruster from './Thruster';
import GyroCompass from './GyroCompass';
import MRU from './MRU';
import WindSensor from './WindSensor';
import GPS from './GPS';

class Ship {
  constructor(vesselModel) {
    this._vesselModel = vesselModel;

    this._thrusters = [
      new Thruster(1, 'Tunnel', 'tunnel', 'rpm', 800.0, 800.0),
      new Thruster(2, 'Port prop', 'propeller', 'rpm', 2000.0, 1500.0),
      new Thruster(3, 'Stbd prop', 'propeller', 'rpm', 2000.0, 1500.0),
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

    this._gpses = [
      new GPS(1, 0.0, 0.0),
    ];

    this.destruct = this.destruct.bind(this);
    this.tick = this.tick.bind(this);

    this.simulationTimeToken = PubSub.subscribe('simulationTime', this.tick);
  }

  destruct() {
    PubSub.unsubscribe(this.simulationTimeToken);
  }

  tick() {
    for (let thrIdx = 0; thrIdx < this._thrusters.length; thrIdx += 1) {
      this.thrusters[thrIdx].demand = 0.5;
    }

    for (let wsIdx = 0; wsIdx < this._windSensors.length; wsIdx += 1) {
      this._windSensors[wsIdx].measureSpeed();
      this._windSensors[wsIdx].measureDirection();
    }

    for (let mruIdx = 0; mruIdx < this._mruSensors.length; mruIdx += 1) {
      this._mruSensors[mruIdx].measureRoll(0.5);
      this._mruSensors[mruIdx].measurePitch(0.5);
    }

    for (let gyroIdx = 0; gyroIdx < this._gyrocompasses.length; gyroIdx += 1) {
      this._gyrocompasses[gyroIdx].measureHeading();
    }

    for (let gpsIdx = 0; gpsIdx < this._gpses.length; gpsIdx += 1) {
      this._gpses[gpsIdx].measurePosition();
    }

    this._vesselModel.calculatePosition(0, 0, -1000000);

    // Publish to the view.
    PubSub.publish('thrusters', this.thrusters);
    PubSub.publish('windSensors', this.windSensors);
    PubSub.publish('mruSensors', this.mruSensors);
    PubSub.publish('gyrocompasses', this.gyrocompasses);
    PubSub.publish('gpses', this.gpses);
  }

  get thrusters() { return this._thrusters; }

  get windSensors() { return this._windSensors; }

  get mruSensors() { return this._mruSensors; }

  get gyrocompasses() { return this._gyrocompasses; }

  get gpses() { return this._gpses; }
}

export default Ship;
