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

    return (
      <tr>
        <td>{number}</td>
        <td>{position.latitude}</td>
        <td>{position.longitude}</td>
      </tr>
    );
  }
}

GPS.propTypes = {
  gpsData: PropTypes.object.isRequired,
};

export default GPS;
