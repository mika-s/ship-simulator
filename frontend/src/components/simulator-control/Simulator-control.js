import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Simulator-control.css';

class SimulatorControl extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
  }

  start(e) {
    this.props.onStart(e.target.value);
  }

  pause(e) {
    this.props.onPause(e.target.value);
  }

  stop(e) {
    this.props.onStop(e.target.value);
  }

  render() {
    const { simulationTime } = this.props;

    return (
      <div className="ship">
        <button type="button" onClick={this.start} className="btn btn-success">Start</button>
        <button type="button" onClick={this.pause} className="btn btn-warning">Pause</button>
        <button type="button" onClick={this.stop} className="btn btn-danger">Stop</button>

        <p>{simulationTime}</p>
      </div>
    );
  }
}

SimulatorControl.propTypes = {
  simulationTime: PropTypes.number.isRequired,
  onStart: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
};

export default SimulatorControl;
