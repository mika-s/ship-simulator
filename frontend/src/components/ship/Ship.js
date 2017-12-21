import React, { Component } from 'react';
import Thruster from '../../domain/Thruster';
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
      windSensors: [],
      mruSensors: [],
      gyrocompasses: [],
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
