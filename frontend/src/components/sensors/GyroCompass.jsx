import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GyroCompass extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { number, heading, rot } = this.props.gyroCompassData;
    const displayHeading = heading.toFixed(1);
    const displayRot = rot.toFixed(1);

    return (
      <tr>
        <td>{number}</td>
        <td>{displayHeading}</td>
        <td>{displayRot}</td>
        <td />
      </tr>
    );
  }
}

GyroCompass.propTypes = {
  gyroCompassData: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default GyroCompass;
