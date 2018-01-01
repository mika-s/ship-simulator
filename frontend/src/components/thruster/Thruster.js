import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Thruster.css';

class Thruster extends Component {
  constructor() {
    super();
    this.state = { manualRpm: 0.0, manualPitch: 0.0, manualAzimuth: 0.0 };

    this.handleRpmChange = this.handleRpmChange.bind(this);
    this.handlePitchChange = this.handlePitchChange.bind(this);
    this.handleAzimuthChange = this.handleAzimuthChange.bind(this);
    this.changeManualRpmDemand = this.changeManualRpmDemand.bind(this);
    this.changeManualPitchDemand = this.changeManualPitchDemand.bind(this);
    this.changeManualAzimuthDemand = this.changeManualAzimuthDemand.bind(this);
  }

  handleRpmChange(event) { this.setState({ manualRpm: event.target.value }); }
  handlePitchChange(event) { this.setState({ manualPitch: event.target.value }); }
  handleAzimuthChange(event) { this.setState({ manualAzimuth: event.target.value }); }

  changeManualRpmDemand(event) {
    event.preventDefault();
    const { number } = this.props.thrusterData;
    const manualRpmFactor = Number.parseFloat(this.state.manualRpm) / 100.0;

    this.props.setThrusterDemand(number, 'rpm', manualRpmFactor);
  }

  changeManualPitchDemand(event) {
    event.preventDefault();
    const { number } = this.props.thrusterData;
    const manualPitchFactor = Number.parseFloat(this.state.manualPitch) / 100.0;

    this.props.setThrusterDemand(number, 'pitch', manualPitchFactor);
  }

  changeManualAzimuthDemand(event) {
    event.preventDefault();
    const { number } = this.props.thrusterData;
    const manualAzimuthFactor = Number.parseFloat(this.state.manualAzimuth);

    this.props.setThrusterDemand(number, 'azimuth', manualAzimuthFactor);
  }

  render() {
    const {
      name, number, force, power, thrusterType, controlType,
      demand, feedback,
    } = this.props.thrusterData;

    const displayForce = force.toFixed(2);
    const displayPower = power.toFixed(2);

    const displayRpmDemand = (demand.rpm * 100.0).toFixed(2);
    const displayPitchDemand = (demand.pitch * 100.0).toFixed(2);
    const displayAzimuthDemand = (demand.azimuth).toFixed(1);

    const displayRpmFeedback = (feedback.rpm * 100.0).toFixed(2);
    const displayPitchFeedback = (feedback.pitch * 100.0).toFixed(2);
    const displayAzimuthFeedback = (feedback.azimuth).toFixed(1);

    return (
      <div className="card" style={{ marginTop: 20, marginBottom: 20 }}>
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <h6 className="card-subtitle mb-2 text-muted">No. {number}</h6>
          <div className="card-text">
            <table className="typeTable">
              <tbody>
                <tr>
                  <td>Thruster type:</td>
                  <td>{thrusterType}</td>
                </tr>
                <tr>
                  <td>Control type:</td>
                  <td>{controlType}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <table className="table table-condensed">
            <tbody>
              <tr>
                <td style={{ width: '25%' }}>Force</td>
                <td style={{ width: '15%' }}>{displayForce} T</td>
                <td style={{ width: '20%' }} />
                <td style={{ width: '20%' }}>Power</td>
                <td style={{ width: '20%' }}>{displayPower} kW</td>
              </tr>
              <tr>
                <td>RPM demand</td>
                <td>{displayRpmDemand} %</td>
                <td>
                  <form className="form-inline" onSubmit={this.changeManualRpmDemand}>
                    <input
                      type="number"
                      min="-100"
                      max="100"
                      step="0.1"
                      defaultValue={demand.rpm * 100.0}
                      onChange={this.handleRpmChange}
                      style={{ width: 70, marginLeft: 15 }}
                      className="form-control mb-2 mr-sm-2 mb-sm-0"
                      required
                    />
                    <button className="btn btn-secondary btn-sm" type="submit">Set</button>
                  </form>
                </td>
                <td>RPM feedback</td>
                <td>{displayRpmFeedback} %</td>
              </tr>
              <tr>
                <td>Pitch demand</td>
                <td>{displayPitchDemand} %</td>
                <td>
                  <form className="form-inline" onSubmit={this.changeManualPitchDemand}>
                    <input
                      type="number"
                      min="-100"
                      max="100"
                      step="0.1"
                      defaultValue={demand.pitch * 100.0}
                      onChange={this.handlePitchChange}
                      style={{ width: 70, marginLeft: 15 }}
                      className="form-control mb-2 mr-sm-2 mb-sm-0"
                      required
                    />
                    <button className="btn btn-secondary btn-sm" type="submit">Set</button>
                  </form>
                </td>
                <td>Pitch feedback</td>
                <td>{displayPitchFeedback} %</td>
              </tr>
              <tr>
                <td>Azimuth demand</td>
                <td>{displayAzimuthDemand}°</td>
                <td>
                  <form className="form-inline" onSubmit={this.changeManualAzimuthDemand}>
                    <input
                      type="number"
                      min="0"
                      max="360"
                      step="0.1"
                      defaultValue={demand.azimuth}
                      onChange={this.handleAzimuthChange}
                      style={{ width: 70, marginLeft: 15 }}
                      className="form-control mb-2 mr-sm-2 mb-sm-0"
                      required
                    />
                    <button className="btn btn-secondary btn-sm" type="submit">Set</button>
                  </form>
                </td>
                <td>Azimuth feedback</td>
                <td>{displayAzimuthFeedback}°</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Thruster.propTypes = {
  thrusterData: PropTypes.object.isRequired,
  setThrusterDemand: PropTypes.func.isRequired,
};

export default Thruster;
