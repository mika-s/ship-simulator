import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { simulate, pauseSimulation, stopSimulation } from '../../actions/simulation.actions';
import { simulationState } from '../../util/enums';
import './Simulator-control.css';

class SimulatorControl extends Component {
  constructor() {
    super();
    this.state = {};

    this.tick = this.tick.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
  }

  tick() {
    this.props.onSimulateClick(simulate());
  }

  start() {
    if (this.props.state !== simulationState.RUNNING) {
      this._timerID = setInterval(() => this.tick(), 1000);
    }
  }

  pause() {
    if (this.props.state === simulationState.RUNNING) {
      this.props.onPauseClick(pauseSimulation());
      clearInterval(this._timerID);
    }
  }

  stop() {
    if (this.props.state !== simulationState.STOPPED) {
      this.props.onStopClick(stopSimulation());
      clearInterval(this._timerID);
    }
  }

  render() {
    const { time } = this.props;

    return (
      <div className="row">
        <div className="col-lg-2">
          <p className="middle-vertical-align">Simulation time:</p>
        </div>
        <div className="col-lg-1">
          <p className="middle-vertical-align">{time}</p>
        </div>
        <div className="col-lg-2">
          <div className="btn-toolbar">
            <div className="btn-group mr-2">
              <button type="button" onClick={this.start} className="btn btn-success">
                <span className="fa fa-play" />
              </button>

              <button type="button" onClick={this.pause} className="btn btn-warning">
                <span className="fa fa-pause" />
              </button>

              <button type="button" onClick={this.stop} className="btn btn-danger">
                <span className="fa fa-stop" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  time: state.simulation.time,
  state: state.simulation.simulationState,
});

const mapDispatchToProps = dispatch => ({
  onSimulateClick: () => dispatch(simulate()),
  onPauseClick: () => dispatch(pauseSimulation()),
  onStopClick: () => dispatch(stopSimulation()),
});

const ConnectedSimulatorControl = connect(mapStateToProps, mapDispatchToProps)(SimulatorControl);

SimulatorControl.propTypes = {
  time: PropTypes.number.isRequired,
  state: PropTypes.number.isRequired,
  onSimulateClick: PropTypes.func.isRequired,
  onPauseClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
};

export default ConnectedSimulatorControl;
