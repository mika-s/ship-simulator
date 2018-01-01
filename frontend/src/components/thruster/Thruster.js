import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Thruster.css';

class Thruster extends Component {
  constructor() {
    super();
    this.state = {};

    this.changeManualRpmDemand = this.changeManualRpmDemand.bind(this);
    this.changeManualPitchDemand = this.changeManualPitchDemand.bind(this);
  }

  changeManualRpmDemand(event) {
    const { number } = this.props.thrusterData;
    const manualRpmDemand = Number.parseFloat(event.target.value) / 100.0;

    this.props.setThrusterDemand(number, 'rpm', manualRpmDemand);
  }

  changeManualPitchDemand(event) {
    const { number } = this.props.thrusterData;
    const manualPitchDemand = Number.parseFloat(event.target.value) / 100.0;

    this.props.setThrusterDemand(number, 'pitch', manualPitchDemand);
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
    const displayRpmFeedback = (feedback.rpm * 100.0).toFixed(2);
    const displayPitchFeedback = (feedback.pitch * 100.0).toFixed(2);

    return (
      <div className="card" style={{ marginTop: 20, marginBottom: 20 }}>
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <h6 className="card-subtitle mb-2 text-muted">No. {number}</h6>
          <div className="card-text">
            <p>Thruster type: {thrusterType}</p>
            <p>Control type: {controlType}</p>
          </div>
          <table className="table table-condensed">
            <tbody>
              <tr>
                <td>Force</td>
                <td>{displayForce} T</td>
                <td>Power</td>
                <td>{displayPower} kW</td>
              </tr>
              <tr>
                <td>RPM demand</td>
                <td>
                  <form className="form-inline">
                    {displayRpmDemand} %
                    <input
                      type="number"
                      min="-100"
                      max="100"
                      step="0.1"
                      defaultValue={this.state.manualRpmDemand}
                      onChange={this.changeManualRpmDemand}
                      style={{ width: 70, marginLeft: 15 }}
                      className="form-control mb-2 mr-sm-2 mb-sm-0"
                    />
                  </form>
                </td>
                <td>Pitch demand</td>
                <td>
                  <form className="form-inline">
                    {displayPitchDemand} %
                    <input
                      type="number"
                      min="-100"
                      max="100"
                      step="0.1"
                      defaultValue={this.state.manualPitchDemand}
                      onChange={this.changeManualPitchDemand}
                      style={{ width: 70, marginLeft: 15 }}
                      className="form-control mb-2 mr-sm-2 mb-sm-0"
                    />
                  </form>
                </td>
              </tr>
              <tr>
                <td>RPM feedback</td>
                <td>
                  {displayRpmFeedback} %
                </td>
                <td>Pitch feedback</td>
                <td>
                  {displayPitchFeedback} %
                </td>
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
