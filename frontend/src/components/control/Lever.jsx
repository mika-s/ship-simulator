import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TunnelThruster from '../misc/TunnelThruster/TunnelThruster';
import './Control.css';

class Lever extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { thrusters } = this.props;

    return (
      <div className="settings">
        <h4>Lever</h4>
        <div className="thruster-slider">
          <TunnelThruster
            thrusterData={thrusters[0]}
            setThrusterDemand={this.props.setThrusterDemand}
          />
        </div>
      </div>
    );
  }
}

Lever.propTypes = {
  thrusters: PropTypes.arrayOf(PropTypes.object).isRequired,
  setThrusterDemand: PropTypes.func.isRequired,
};

export default Lever;
