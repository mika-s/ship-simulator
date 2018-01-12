import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setThrusterDemand } from '../../actions/ui.thruster.actions';
import Thruster from './Thruster';
import './Thrusters.css';

class Thrusters extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const thrusterElements = this.props.thrusters.map(thruster => (
      <Thruster
        key={thruster.number}
        thrusterData={thruster}
        setThrusterDemand={this.props.setThrusterDemand}
      />));

    return (
      <div className="thrusters">
        <h2>Thrusters</h2>
        {thrusterElements}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  thrusters: state.ship.thrusters,
});

const mapDispatchToProps = dispatch => ({
  setThrusterDemand: (number, type, demand) => dispatch(setThrusterDemand(number, type, demand)),
});

const ConnectedThrusters = connect(mapStateToProps, mapDispatchToProps)(Thrusters);

Thrusters.propTypes = {
  thrusters: PropTypes.arrayOf(PropTypes.object).isRequired,
  setThrusterDemand: PropTypes.func.isRequired,
};

export default ConnectedThrusters;
