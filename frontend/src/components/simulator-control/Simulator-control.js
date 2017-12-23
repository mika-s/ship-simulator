import * as PubSub from 'pubsub-js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Simulator-control.css';

class SimulatorControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulationTime: 0,
    };

    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentDidMount() {
    const simulationTimeSubscriber = (msg, data) => {
      this.setState({ simulationTime: data });
    };

    this.simulationTimeToken = PubSub.subscribe('simulationTime', simulationTimeSubscriber);
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.simulationTimeToken);
  }

  start() {
    this.props.onStart();
  }

  pause() {
    this.props.onPause();
  }

  stop() {
    this.props.onStop();
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.start} className="btn btn-success">Start</button>
        <button type="button" onClick={this.pause} className="btn btn-warning">Pause</button>
        <button type="button" onClick={this.stop} className="btn btn-danger">Stop</button>

        <p>{this.state.simulationTime}</p>
      </div>
    );
  }
}

SimulatorControl.propTypes = {
  onStart: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
};

export default SimulatorControl;
