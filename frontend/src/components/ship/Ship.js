import React, { Component } from 'react';
import Thruster from '../../domain/Thruster';
import GyroCompass from '../../domain/GyroCompass';
import MRU from '../../domain/MRU';
import WindSensor from '../../domain/WindSensor';
import './Ship.css';

class Ship extends Component {
  constructor() {
    super();
    this.state = {
      simulationTime: 0,
      thrusters: [
        new Thruster('tunnel', 'rpm', 800.0, 800.0),
        new Thruster('propeller', 'rpm', 2000.0, 1500.0),
        new Thruster('propeller', 'rpm', 2000.0, 1500.0),
      ],
      windSensors: [
        new WindSensor(),
        new WindSensor(),
      ],
      mruSensors: [
        new MRU(),
      ],
      gyrocompasses: [
        new GyroCompass(),
      ],
    };

    this.tick = this.tick.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    for (let thrIdx = 0; thrIdx < this.state.thrusters.length; thrIdx += 1) {
      this.state.thrusters[thrIdx].calculateForce(0.5);
      this.state.thrusters[thrIdx].calculatePower(0.5);
    }

    for (let wsIdx = 0; wsIdx < this.state.windSensors.length; wsIdx += 1) {
      this.state.windSensors[wsIdx].calculateSpeed(0.5);
      this.state.windSensors[wsIdx].calculateDirection(0.5);
    }

    for (let mruIdx = 0; mruIdx < this.state.mruSensors.length; mruIdx += 1) {
      this.state.mruSensors[mruIdx].calculateRoll(0.5);
      this.state.mruSensors[mruIdx].calculatePitch(0.5);
    }

    for (let gyroIdx = 0; gyroIdx < this.state.gyrocompasses.length; gyroIdx += 1) {
      this.state.gyrocompasses[gyroIdx].calculateHeading(0.5);
    }

    this.setState(prevState => ({ simulationTime: prevState.simulationTime + 1 }));
  }

  start() {
    this.timerID = setInterval(
      () => this.tick(),
      1000,
    );
  }

  pause() {
    clearInterval(this.timerID);
  }

  stop() {
    clearInterval(this.timerID);
    this.setState({ simulationTime: 0 });
  }

  render() {
    return (
      <div className="ship">
        <button type="button" onClick={this.start} className="btn btn-success">Start</button>
        <button type="button" onClick={this.pause} className="btn btn-warning">Pause</button>
        <button type="button" onClick={this.stop} className="btn btn-danger">Stop</button>

        <p>{this.state.simulationTime}</p>
      </div>
    );
  }
}

export default Ship;
