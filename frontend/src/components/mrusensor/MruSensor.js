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

    return (
      <tr>
        <td>{number}</td>
        <td>{roll}</td>
        <td>{pitch}</td>
      </tr>
    );
  }
}

MruSensor.propTypes = {
  mruSensorData: PropTypes.object.isRequired,
};

export default MruSensor;
