import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Azimuth from './Azimuth';
import Pitch from './Pitch';
import Rpm from './Rpm';
import './Thrusters.css';

class Thruster extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      name, number, force, power, thrusterType, controlType, demand, feedback, mode,
    } = this.props.thrusterData;

    const displayForce = force.toFixed(2);
    const displayPower = power.toFixed(2);

    return (
      <div className="card" style={{ marginTop: 20, marginBottom: 20 }}>
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <h6 className="card-subtitle mb-2 text-muted">No. {number}</h6>
          <div className="card-text">
            <table className="type-table">
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
              {controlType === 'rpm' &&
                <Rpm
                  demand={demand.rpm}
                  feedback={feedback.rpm}
                  number={number}
                  mode={mode}
                  setThrusterDemand={this.props.setThrusterDemand}
                />}
              {controlType === 'pitch' &&
                <Pitch
                  demand={demand.pitch}
                  feedback={feedback.pitch}
                  number={number}
                  mode={mode}
                  setThrusterDemand={this.props.setThrusterDemand}
                />}
              {(thrusterType === 'propeller' || thrusterType === 'azimuth') &&
                <Azimuth
                  demand={demand.azimuth}
                  feedback={feedback.azimuth}
                  number={number}
                  mode={mode}
                  setThrusterDemand={this.props.setThrusterDemand}
                />}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Thruster.propTypes = {
  thrusterData: PropTypes.shape({
    number: PropTypes.number,
    name: PropTypes.string,
    thrusterType: PropTypes.string,
    controlType: PropTypes.string,
    maxPower: PropTypes.object,
    location: PropTypes.object,
    risetimes: PropTypes.object,
    force: PropTypes.number,
    power: PropTypes.number,
    demand: PropTypes.object,
    feedback: PropTypes.object,
    mode: PropTypes.number,
  }).isRequired,
  setThrusterDemand: PropTypes.func.isRequired,
};

export default Thruster;
