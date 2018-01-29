import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { vesselControlMode } from '../../util/enums';
import './Thrusters.css';

class Azimuth extends Component {
  constructor() {
    super();
    this.state = { manualAzimuth: 0.0 };

    this.handleAzimuthChange = this.handleAzimuthChange.bind(this);
    this.changeManualAzimuthDemand = this.changeManualAzimuthDemand.bind(this);
  }

  handleAzimuthChange(event) { this.setState({ manualAzimuth: event.target.value }); }

  changeManualAzimuthDemand(event) {
    event.preventDefault();
    const manualAzimuthFactor = Number.parseFloat(this.state.manualAzimuth);

    this.props.setThrusterDemand(this.props.number, 'azimuth', manualAzimuthFactor);
  }

  render() {
    const displayAzimuthDemand = (this.props.demand).toFixed(1);
    const displayAzimuthFeedback = (this.props.feedback).toFixed(1);

    return (
      <tr>
        <td>Azimuth demand</td>
        <td>{displayAzimuthDemand}°</td>
        <td>
          {this.props.mode === vesselControlMode.TEST &&
            <form className="form-inline" onSubmit={this.changeManualAzimuthDemand}>
              <input
                type="number"
                min="0"
                max="360"
                step="0.1"
                defaultValue={this.props.demand}
                onChange={this.handleAzimuthChange}
                style={{ width: 80, marginLeft: 15 }}
                className="form-control mb-2 mr-sm-2 mb-sm-0"
                required
              />
              <button className="btn btn-secondary btn-sm" type="submit">Set</button>
            </form>}
        </td>
        <td>Azimuth feedback</td>
        <td>{displayAzimuthFeedback}°</td>
      </tr>
    );
  }
}

Azimuth.propTypes = {
  demand: PropTypes.number.isRequired,
  feedback: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  mode: PropTypes.number.isRequired,
  setThrusterDemand: PropTypes.func.isRequired,
};

export default Azimuth;
