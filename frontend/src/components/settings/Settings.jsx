import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setWindSpeed, setWindDirection, setPosition, setCurrentSpeed, setCurrentDirection,
} from '../../actions/ui.simulation.actions';
import Current from './Current';
import Wind from './Wind';
import InitialPosition from './InitialPosition';
import './Settings.css';

export class UnconnectedSettings extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      currentSpeed, currentDirection, windSpeed, windDirection, position,
    } = this.props;

    return (
      <div className="settings">
        <h2>Settings</h2>
        <div className="row">
          <div className="col-lg-6">
            <Current
              setCurrentSpeed={this.props.setCurrentSpeed}
              setCurrentDirection={this.props.setCurrentDirection}
              speed={currentSpeed}
              direction={currentDirection}
            />
          </div>
          <div className="col-lg-6">
            <Wind
              setWindSpeed={this.props.setWindSpeed}
              setWindDirection={this.props.setWindDirection}
              speed={windSpeed}
              direction={windDirection}
            />
          </div>
          <div className="col-lg-6">
            <InitialPosition
              setPosition={this.props.setPosition}
              position={position}
            />
          </div>
        </div>
      </div>
    );
  }
}

UnconnectedSettings.propTypes = {
  currentSpeed: PropTypes.number.isRequired,
  currentDirection: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
  windDirection: PropTypes.number.isRequired,
  position: PropTypes.objectOf(PropTypes.number).isRequired,
  setWindSpeed: PropTypes.func.isRequired,
  setWindDirection: PropTypes.func.isRequired,
  setCurrentSpeed: PropTypes.func.isRequired,
  setCurrentDirection: PropTypes.func.isRequired,
  setPosition: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentSpeed: state.ui.current.speed,
  currentDirection: state.ui.current.direction,
  windSpeed: state.ui.wind.speed,
  windDirection: state.ui.wind.direction,
  position: state.ui.position,
});

const mapDispatchToProps = dispatch => ({
  setCurrentSpeed: speed => dispatch(setCurrentSpeed(speed)),
  setCurrentDirection: direction => dispatch(setCurrentDirection(direction)),
  setWindSpeed: speed => dispatch(setWindSpeed(speed)),
  setWindDirection: direction => dispatch(setWindDirection(direction)),
  setPosition: position => dispatch(setPosition(position)),
});

const Settings = connect(mapStateToProps, mapDispatchToProps)(UnconnectedSettings);

export default Settings;
