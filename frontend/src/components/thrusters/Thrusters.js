import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Thruster from '../thruster/Thruster';
import './Thrusters.css';

class Thrusters extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const thrusterElements = this.props.thrusters.map(thruster =>
      <Thruster key={thruster.number} thrusterData={thruster} />);

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

const mapDispatchToProps = () => ({});

const ConnectedThrusters = connect(mapStateToProps, mapDispatchToProps)(Thrusters);

Thrusters.propTypes = {
  thrusters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ConnectedThrusters;
