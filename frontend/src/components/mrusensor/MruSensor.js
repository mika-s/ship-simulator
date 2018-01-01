import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MruSensor.css';

class MruSensor extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      number, roll, pitch,
    } = this.props.mruSensorData;

    const displayRoll = roll.toFixed(2);
    const displayPitch = pitch.toFixed(2);

    return (
      <tr>
        <td>{number}</td>
        <td>{displayRoll}</td>
        <td>{displayPitch}</td>
        <td />
      </tr>
    );
  }
}

MruSensor.propTypes = {
  mruSensorData: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default MruSensor;
