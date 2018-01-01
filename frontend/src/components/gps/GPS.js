import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './GPS.css';

class GPS extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { number, position } = this.props.gpsData;

    const displayLatitude = position.latitude.toFixed(6);
    const displayLongitude = position.longitude.toFixed(6);

    return (
      <tr>
        <td>{number}</td>
        <td>{displayLatitude}</td>
        <td>{displayLongitude}</td>
      </tr>
    );
  }
}

GPS.propTypes = {
  gpsData: PropTypes.object.isRequired,
};

export default GPS;
