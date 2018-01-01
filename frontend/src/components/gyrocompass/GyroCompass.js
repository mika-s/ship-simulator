import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './GyroCompass.css';

class GyroCompass extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      number, heading,
    } = this.props.gyroCompassData;

    const displayHeading = heading.toFixed(2);

    return (
      <tr>
        <td>{number}</td>
        <td>{displayHeading}</td>
        <td />
      </tr>
    );
  }
}

GyroCompass.propTypes = {
  gyroCompassData: PropTypes.object.isRequired,
};

export default GyroCompass;
