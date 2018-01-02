import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setWindSpeed, setWindDirection } from '../../actions/ui.simulation.actions';
import Wind from './Wind';
import './Settings.css';

class Settings extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { windSpeed, windDirection } = this.props;

    return (
      <div className="settings">
        <h2>Settings</h2>
        <Wind
          setWindSpeed={this.props.setWindSpeed}
          setWindDirection={this.props.setWindDirection}
          speed={windSpeed}
          direction={windDirection}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  windSpeed: state.ui.wind.speed,
  windDirection: state.ui.wind.direction,
});

const mapDispatchToProps = dispatch => ({
  setWindSpeed: speed => dispatch(setWindSpeed(speed)),
  setWindDirection: direction => dispatch(setWindDirection(direction)),
});

const ConnectedSettings = connect(mapStateToProps, mapDispatchToProps)(Settings);

Settings.propTypes = {
  windSpeed: PropTypes.number.isRequired,
  windDirection: PropTypes.number.isRequired,
  setWindSpeed: PropTypes.func.isRequired,
  setWindDirection: PropTypes.func.isRequired,
};

export default ConnectedSettings;
