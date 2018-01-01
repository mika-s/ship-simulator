import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WindSensor.css';

class WindSensor extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { number, speed, direction } = this.props.windSensorData;
    const displaySpeed = speed.toFixed(2);
    const displayDirection = direction.toFixed(2);

    return (
      <tr>
        <td>{number}</td>
        <td>{displaySpeed}</td>
        <td>{displayDirection}</td>
        <td />
      </tr>
    );
  }
}

WindSensor.propTypes = {
  windSensorData: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default WindSensor;
