import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WindSensor.css';

class WindSensor extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      number, speed, direction,
    } = this.props.windSensorData;

    return (
      <tr>
        <td>{number}</td>
        <td>{speed}</td>
        <td>{direction}</td>
      </tr>
    );
  }
}

WindSensor.propTypes = {
  windSensorData: PropTypes.object.isRequired,
};

export default WindSensor;
