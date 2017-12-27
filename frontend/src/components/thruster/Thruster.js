import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Thruster.css';

class Thruster extends Component {
  constructor() {
    super();
    this.state = {
      manualRpmDemand: 0,
    };

    this.changeManualRpmDemand = this.changeManualRpmDemand.bind(this);
  }

  changeManualRpmDemand(event) {
    const manualRpmDemand = Number.parseFloat(event.target.value) / 100.0;
    this.props.thrusterData.rpmDemand = manualRpmDemand;
    this.setState({ manualRpmDemand });
  }

  render() {
    const {
      name, number, force, power, thrusterType, controlType,
      rpmDemand, pitchDemand,
    } = this.props.thrusterData;

    const displayForce = typeof force !== 'undefined' ? force.toFixed(2) : 0;
    const displayPower = typeof power !== 'undefined' ? power.toFixed(2) : 0;
    const displayRpmDemand = typeof rpmDemand !== 'undefined' ? (rpmDemand * 100.0).toFixed(2) : 0;
    const displayPitchDemand = typeof pitchDemand !== 'undefined' ? (pitchDemand * 100.0).toFixed(2) : 0;

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
                <td>{displayPitchDemand} %</td>
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
};

export default Thruster;
