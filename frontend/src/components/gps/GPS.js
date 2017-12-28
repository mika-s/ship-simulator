import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './GPS.css';

class GPS extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      number, latitude, longitude,
    } = this.props.gpsData;

    return (
      <tr>
        <td>{number}</td>
        <td>{latitude}</td>
        <td>{longitude}</td>
      </tr>
    );
  }
}

GPS.propTypes = {
  gpsData: PropTypes.object.isRequired,
};

export default GPS;
