import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setThrusterDemand } from '../../actions/ui.thruster.actions';
import Thruster from './Thruster';
import './Thrusters.css';

export class UnconnectedThrusters extends Component {
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

UnconnectedThrusters.propTypes = {
  thrusters: PropTypes.arrayOf(PropTypes.object).isRequired,
  setThrusterDemand: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  thrusters: state.ship.thrusters,
});

const mapDispatchToProps = dispatch => ({
  setThrusterDemand: (number, type, demand) => dispatch(setThrusterDemand(number, type, demand)),
});

const Thrusters = connect(mapStateToProps, mapDispatchToProps)(UnconnectedThrusters);

export default Thrusters;
