import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AzimuthThruster from '../misc/AzimuthThruster/AzimuthThruster';
import TunnelThruster from '../misc/TunnelThruster/TunnelThruster';
import './Control.css';

class Lever extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { thrusters } = this.props;

    const thrusterElements = [];

    for (let thrIdx = 0; thrIdx < thrusters.length; thrIdx += 1) {
      thrusterElements.push(
        <div
          className=" d-flex p-2"
          key={thrusters[thrIdx].number}
          style={{
            // position: 'relative',
            // top: 200 - (1 * thrusters[thrIdx].location.x),
            // left: 500 + (50 * thrusters[thrIdx].location.y),
          }}
        >
          <div style={{ position: 'static' }}>
            {thrusters[thrIdx].thrusterType === 'tunnel' &&
              <TunnelThruster
                thrusterData={thrusters[thrIdx]}
                setThrusterDemand={this.props.setThrusterDemand}
              />
            }
            {thrusters[thrIdx].thrusterType === 'azimuth' &&
              <AzimuthThruster
                thrusterData={thrusters[thrIdx]}
                setThrusterDemand={this.props.setThrusterDemand}
              />
            }
          </div>
        </div>);
    }

    return (
      <div className="settings">
        <div className="thrusters" style={{ display: 'flex' }}>
          {thrusterElements}
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
