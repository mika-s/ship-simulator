import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setControlMode, setAutopilotHeading, setAutopilotSpeed, toggleAutopilot,
  setAutopilotPgain, setAutopilotIgain, setAutopilotDgain,
} from '../../actions/ui.control.actions';
import { setAlphaForHeading, setBetaForHeading } from '../../actions/ui.estimator.actions';
import { setThrusterDemand } from '../../actions/ui.thruster.actions';
import { vesselControlMode } from '../../util/enums';
import Lever from './Lever/Lever';
import Autopilot from './Autopilot/Autopilot';
import './Control.css';

export class UnconnectedControl extends Component {
  constructor() {
    super();
    this.state = {};

    this.setButtonColor = this.setButtonColor.bind(this);
    this.setMode = this.setMode.bind(this);
  }

  setButtonColor(number) {
    let cssClass;
    if (this.props.mode === number) {
      cssClass = 'btn btn-primary mode-button';
    } else {
      cssClass = 'btn btn-secondary mode-button';
    }

    return cssClass;
  }

  setMode(newMode) {
    this.props.setControlMode(newMode);
  }

  render() {
    const {
      thrusters, active, heading, speed, alpha, beta, headingGain,
    } = this.props;

    return (
      <div className="settings">
        <h2>Control</h2>
        <form className="form-inline" style={{ marginTop: 20 }}>
          <input
            type="button"
            onClick={() => this.setMode(vesselControlMode.STANDBY)}
            value="Standby"
            className={this.setButtonColor(vesselControlMode.STANDBY)}
          />
          <input
            type="button"
            onClick={() => this.setMode(vesselControlMode.TEST)}
            value="Test"
            className={this.setButtonColor(vesselControlMode.TEST)}
          />
          <input
            type="button"
            onClick={() => this.setMode(vesselControlMode.LEVER)}
            value="Lever"
            className={this.setButtonColor(vesselControlMode.LEVER)}
          />
          <input
            type="button"
            onClick={() => this.setMode(vesselControlMode.AUTOPILOT)}
            value="Autopilot"
            className={this.setButtonColor(vesselControlMode.AUTOPILOT)}
          />
        </form>
        {this.props.mode === vesselControlMode.LEVER &&
          <Lever
            thrusters={thrusters}
            setThrusterDemand={this.props.setThrusterDemand}
          />
        }
        {this.props.mode === vesselControlMode.AUTOPILOT &&
          <Autopilot
            active={active}
            initialHeading={heading}
            initialSpeed={speed}
            initialAlpha={alpha}
            initialBeta={beta}
            initialHeadingGain={headingGain}
            thrusters={thrusters}
            setAutopilotHeading={this.props.setAutopilotHeading}
            setAutopilotSpeed={this.props.setAutopilotSpeed}
            setAlphaForHeading={this.props.setAlphaForHeading}
            setBetaForHeading={this.props.setBetaForHeading}
            setAutopilotPgain={this.props.setAutopilotPgain}
            setAutopilotIgain={this.props.setAutopilotIgain}
            setAutopilotDgain={this.props.setAutopilotDgain}
            toggleAutopilot={this.props.toggleAutopilot}
          />
        }
      </div>
    );
  }
}

UnconnectedControl.propTypes = {
  mode: PropTypes.number.isRequired,
  thrusters: PropTypes.arrayOf(PropTypes.object).isRequired,
  active: PropTypes.bool.isRequired,
  heading: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  alpha: PropTypes.number.isRequired,
  beta: PropTypes.number.isRequired,
  headingGain: PropTypes.shape({
    p: PropTypes.number.isRequired,
    i: PropTypes.number.isRequired,
    d: PropTypes.number.isRequired,
  }).isRequired,
  setControlMode: PropTypes.func.isRequired,
  setThrusterDemand: PropTypes.func.isRequired,
  setAutopilotHeading: PropTypes.func.isRequired,
  setAutopilotSpeed: PropTypes.func.isRequired,
  setAlphaForHeading: PropTypes.func.isRequired,
  setBetaForHeading: PropTypes.func.isRequired,
  setAutopilotPgain: PropTypes.func.isRequired,
  setAutopilotIgain: PropTypes.func.isRequired,
  setAutopilotDgain: PropTypes.func.isRequired,
  toggleAutopilot: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  mode: state.control.mode,
  thrusters: state.ship.thrusters,
  active: state.control.autopilot.active,
  heading: state.ui.control.autopilot.heading,
  speed: state.ui.control.autopilot.speed,
  alpha: state.ui.estimator.alphabeta.alpha,
  beta: state.ui.estimator.alphabeta.beta,
  headingGain: state.ui.control.autopilot.controllers.headingPid.gain,
});

const mapDispatchToProps = dispatch => ({
  setControlMode: (number, pane) => dispatch(setControlMode(number, pane)),
  setThrusterDemand: (number, type, demand) => dispatch(setThrusterDemand(number, type, demand)),
  setAutopilotHeading: heading => dispatch(setAutopilotHeading(heading)),
  setAutopilotSpeed: heading => dispatch(setAutopilotSpeed(heading)),
  setAlphaForHeading: alpha => dispatch(setAlphaForHeading(alpha)),
  setBetaForHeading: beta => dispatch(setBetaForHeading(beta)),
  setAutopilotPgain: gain => dispatch(setAutopilotPgain(gain)),
  setAutopilotIgain: gain => dispatch(setAutopilotIgain(gain)),
  setAutopilotDgain: gain => dispatch(setAutopilotDgain(gain)),
  toggleAutopilot: heading => dispatch(toggleAutopilot(heading)),
});

const Control = connect(mapStateToProps, mapDispatchToProps)(UnconnectedControl);

export default Control;
