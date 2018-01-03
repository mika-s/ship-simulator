import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Map.css';

class Map extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="map">
        <h1>Map</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  time: state.simulation.time,
  position: state.vesselmodel.model.position,
});

const mapDispatchToProps = () => ({});

const ConnectedMap = connect(mapStateToProps, mapDispatchToProps)(Map);

Map.propTypes = {
  time: PropTypes.number.isRequired,
  position: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default ConnectedMap;
