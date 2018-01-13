import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setControlMode } from '../../actions/ui.control.actions';
import { setThrusterDemand } from '../../actions/ui.thruster.actions';
import { vesselControlMode } from '../../util/enums';
import Lever from './Lever';
import './Control.css';

class Control extends Component {
  constructor() {
    super();
    this.state = {};

    this.setButtonColor = this.setButtonColor.bind(this);
    this.standby = this.standby.bind(this);
    this.lever = this.lever.bind(this);
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

  standby() {
    this.props.setControlMode(vesselControlMode.STANDBY);
  }

  lever() {
    this.props.setControlMode(vesselControlMode.LEVER);
  }

  render() {
    const { mode, thrusters } = this.props;

    return (
      <div className="settings">
        <h2>Control</h2>
        <h3>Modes</h3>
        {mode}
        <form className="form-inline" style={{ marginTop: 20 }}>
          <input
            type="button"
            onClick={this.standby}
            value="Standby"
            className={this.setButtonColor(1)}
          />
          <input
            type="button"
            onClick={this.lever}
            value="Lever"
            className={this.setButtonColor(2)}
          />
        </form>
        {this.props.mode === vesselControlMode.LEVER &&
          <Lever
            thrusters={thrusters}
            setThrusterDemand={this.props.setThrusterDemand}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // uiMode: state.ui.control.mode,
  mode: state.control.mode,
  thrusters: state.ship.thrusters,
});

const mapDispatchToProps = dispatch => ({
  setControlMode: (number, pane) => dispatch(setControlMode(number, pane)),
  setThrusterDemand: (number, type, demand) => dispatch(setThrusterDemand(number, type, demand)),
});

const ConnectedControl = connect(mapStateToProps, mapDispatchToProps)(Control);

Control.propTypes = {
  // uiMode: PropTypes.number.isRequired,
  mode: PropTypes.number.isRequired,
  thrusters: PropTypes.arrayOf(PropTypes.object).isRequired,
  setControlMode: PropTypes.func.isRequired,
  setThrusterDemand: PropTypes.func.isRequired,
};

export default ConnectedControl;
