import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.css';

/**
 * Class representing a Thruster pane for use on the dashboard.
 * This is a dumb component receiving data as props.
 * @extends Component
*/
class ThrustersPane extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const thrusterElements = this.props.thrusters.map(thruster => (
      <div className="row" key={thruster.number}>
        <div className="col-lg-1">
          {thruster.number}
        </div>
        <div className="col-lg-2">
          {thruster.name}
        </div>
        <div className="col-lg-2">
          {thruster.force.toFixed(1)}
        </div>
        <div className="col-lg-2">
          {thruster.controlType === 'pitch' &&
            <div>
              {(thruster.demand.pitch * 100).toFixed(1)}/
              {(thruster.feedback.pitch * 100).toFixed(1)}
            </div>}
        </div>
        <div className="col-lg-2">
          {thruster.controlType === 'rpm' &&
            <div>
              {(thruster.demand.rpm * 100).toFixed(1)}/
              {(thruster.feedback.rpm * 100).toFixed(1)}
            </div>}
        </div>
        <div className="col-lg-2">
          {(thruster.thrusterType === 'propeller' || thruster.thrusterType === 'azimuth') &&
            <div>
              {(thruster.demand.azimuth).toFixed(1)}/
              {(thruster.feedback.azimuth).toFixed(1)}
            </div>}
        </div>
      </div>
    ));

    return (
      <div className="thrusterspane">
        <div className="row" style={{ fontWeight: 'bold', marginBottom: 5 }}>
          <div className="col-lg-1">#</div>
          <div className="col-lg-2">Name</div>
          <div className="col-lg-2">Force [T]</div>
          <div className="col-lg-2">Pitch [%]</div>
          <div className="col-lg-2">RPM [%]</div>
          <div className="col-lg-2">Azimuth [°]</div>
        </div>
        {thrusterElements}
      </div>
    );
  }
}

ThrustersPane.propTypes = {
  thrusters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ThrustersPane;
