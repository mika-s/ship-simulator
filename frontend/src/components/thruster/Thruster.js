import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Thruster.css';

class Thruster extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      name, number, force, power, thrusterType, controlType,
    } = this.props.thrusterData;

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
                <td>{force}</td>
                <td>Power</td>
                <td>{power}</td>
              </tr>
              <tr>
                <td>RPM</td>
                <td>{power}</td>
                <td>Pitch</td>
                <td>{power}</td>
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
