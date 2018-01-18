import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setControlMode, setAutopilotHeading } from '../../actions/ui.control.actions';
import { setThrusterDemand } from '../../actions/ui.thruster.actions';
import { vesselControlMode } from '../../util/enums';
import Lever from './Lever';
import Autopilot from './Autopilot';
import './Control.css';

class Control extends Component {
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
    const { thrusters, heading } = this.props;

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
            initialHeading={heading}
            thrusters={thrusters}
            setAutopilotHeading={this.props.setAutopilotHeading}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mode: state.control.mode,
  thrusters: state.ship.thrusters,
  heading: state.ui.control.autopilot.heading,
});

const mapDispatchToProps = dispatch => ({
  setControlMode: (number, pane) => dispatch(setControlMode(number, pane)),
  setThrusterDemand: (number, type, demand) => dispatch(setThrusterDemand(number, type, demand)),
  setAutopilotHeading: heading => dispatch(setAutopilotHeading(heading)),
});

const ConnectedControl = connect(mapStateToProps, mapDispatchToProps)(Control);

Control.propTypes = {
  mode: PropTypes.number.isRequired,
  thrusters: PropTypes.arrayOf(PropTypes.object).isRequired,
  heading: PropTypes.number.isRequired,
  setControlMode: PropTypes.func.isRequired,
  setThrusterDemand: PropTypes.func.isRequired,
  setAutopilotHeading: PropTypes.func.isRequired,
};

export default ConnectedControl;
