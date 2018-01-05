import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Scatter } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { increaseZoomlevel, decreaseZoomlevel, toggleMotion } from '../../actions/ui.map.actions';
import { motion } from '../../util/enums';
import MapUtil from './MapUtil';
import './Map.css';

class Map extends Component {
  constructor() {
    super();
    this.state = {
      edge: {
        north: 0.0, south: 0.0, east: 0.0, west: 0.0,
      },
      graphData: MapUtil.getInitialMapProperties(),
      options: MapUtil.getInitialOptions(),
    };

    this.calculateZoom = this.calculateZoom.bind(this);
    this.setRelative = this.setRelative.bind(this);
    this.isOutsideMap = this.isOutsideMap.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.zoom = this.zoom.bind(this);
  }

  componentWillMount() {
    this.zoom();
    this.updateMap();
  }

  componentWillReceiveProps() {
    if (this.isOutsideMap() && this.props.motion === motion.TRUE) {
      this.zoom();
    }

    if (this.props.simulationTime === 1 || this.props.motion === motion.RELATIVE) {
      this.zoom();
    }

    this.updateMap();
  }

  setRelative() {
    this.props.toggleMotion();
  }

  isOutsideMap() {
    const { latitude, longitude } = this.props.position;

    const isOutsideNorth = latitude[latitude.length - 1] >= this.state.edge.north;
    const isOutsideSouth = latitude[latitude.length - 1] <= this.state.edge.south;
    const isOutsideEast = longitude[longitude.length - 1] >= this.state.edge.east;
    const isOutsideWest = longitude[longitude.length - 1] <= this.state.edge.west;

    return (isOutsideNorth || isOutsideSouth || isOutsideEast || isOutsideWest);
  }

  calculateZoom() {
    const zoomNumber = 0.001;
    const { zoomlevel } = this.props;

    return zoomNumber / (zoomlevel + 1);
  }

  updateMap() {
    const merged = [];
    for (let i = 0; i < this.props.position.latitude.length; i += 1) {
      merged.push({ x: this.props.position.longitude[i], y: this.props.position.latitude[i] });
    }

    this.setState({
      graphData: update(this.state.graphData, {
        datasets: {
          0: { data: { $set: merged } },
        },
      }),
    });
  }

  zoomIn() {
    this.props.increaseZoomlevel();
    this.zoom();
  }

  zoomOut() {
    this.props.decreaseZoomlevel();
    this.zoom();
  }

  zoom() {
    const { latitude, longitude } = this.props.position;
    const zoom = this.calculateZoom();

    // Find and store the edges of the map.
    if (this.props.motion === motion.TRUE) {
      this.setState({
        edge: {
          north: latitude[latitude.length - 1] + zoom,
          south: latitude[latitude.length - 1] - zoom,
          east: longitude[latitude.length - 1] + zoom,
          west: longitude[latitude.length - 1] - zoom,
        },
      });
    }

    this.setState({
      options: update(this.state.options, {
        scales: {
          xAxes: {
            0: {
              ticks: {
                min: {
                  $set: longitude.length > 0 ?
                    longitude[longitude.length - 1] - zoom : 0,
                },
                max: {
                  $set: longitude.length > 0 ?
                    longitude[longitude.length - 1] + zoom : 0,
                },
              },
            },
          },
          yAxes: {
            0: {
              ticks: {
                min: {
                  $set: latitude.length > 0 ?
                    latitude[latitude.length - 1] - zoom : 0,
                },
                max: {
                  $set: latitude.length > 0 ?
                    latitude[latitude.length - 1] + zoom : 0,
                },
              },
            },
          },
        },
      }),
    });
  }

  render() {
    return (
      <div className="map">
        <h1>Map</h1>
        <div className="row">
          <div className="col-lg-6">
            <form className="form-inline" style={{ marginTop: 20 }}>
              <input
                type="button"
                onClick={this.zoomIn}
                value="+"
                className="btn btn-secondary btn-sm zoom-button"
              />
              {this.props.zoomlevel}x
              <input
                type="button"
                onClick={this.zoomOut}
                value="-"
                className="btn btn-secondary btn-sm zoom-button"
              />
            </form>
          </div>
          <div className="col-lg-6">
            <form className="form-inline" style={{ marginTop: 20 }}>
              {this.props.motion === motion.TRUE &&
                <div>
                  <input
                    type="button"
                    value="True motion"
                    className="btn btn-secondary btn-sm relative-button"
                    disabled
                  />
                  <input
                    type="button"
                    onClick={this.setRelative}
                    value="Relative motion"
                    className="btn btn-outline-secondary btn-sm relative-button"
                  />
                </div>
              }
              {this.props.motion === motion.RELATIVE &&
                <div>
                  <input
                    type="button"
                    onClick={this.setRelative}
                    value="True motion"
                    className="btn btn-outline-secondary btn-sm relative-button"
                  />
                  <input
                    type="button"
                    value="Relative motion"
                    className="btn btn-secondary btn-sm relative-button"
                    disabled
                  />
                </div>
              }
            </form>
          </div>
        </div>
        <div className="row map-plot">
          <div className="col-lg-12">
            <Scatter options={this.state.options} data={this.state.graphData} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  simulationTime: state.simulation.time,
  position: state.timeseries.model.position,
  zoomlevel: state.ui.map.zoomlevel,
  motion: state.ui.map.motion,
});

const mapDispatchToProps = dispatch => ({
  increaseZoomlevel: () => dispatch(increaseZoomlevel()),
  decreaseZoomlevel: () => dispatch(decreaseZoomlevel()),
  toggleMotion: () => dispatch(toggleMotion()),
});

const ConnectedMap = connect(mapStateToProps, mapDispatchToProps)(Map);

Map.propTypes = {
  simulationTime: PropTypes.number.isRequired,
  position: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  zoomlevel: PropTypes.number.isRequired,
  motion: PropTypes.number.isRequired,
  increaseZoomlevel: PropTypes.func.isRequired,
  decreaseZoomlevel: PropTypes.func.isRequired,
  toggleMotion: PropTypes.func.isRequired,
};

export default ConnectedMap;
