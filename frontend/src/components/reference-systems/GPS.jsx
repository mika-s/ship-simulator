import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GPS extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      number, position, speed, direction,
    } = this.props.gpsData;

    const displayLatitude = position.latitude.toFixed(6);
    const displayLongitude = position.longitude.toFixed(6);
    const displaySpeed = speed.toFixed(1);
    const displayDirection = direction.toFixed(1);

    return (
      <tr>
        <td>{number}</td>
        <td>{displayLatitude}</td>
        <td>{displayLongitude}</td>
        <td>{displaySpeed}</td>
        <td>{displayDirection}</td>
      </tr>
    );
  }
}

GPS.propTypes = {
  gpsData: PropTypes.shape({
    number: PropTypes.number,
    position: PropTypes.object,
    speed: PropTypes.number,
    direction: PropTypes.number,
  }).isRequired,
};

export default GPS;
