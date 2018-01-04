import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Scatter } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { increaseZoomlevel, decreaseZoomlevel } from '../../actions/ui.map.actions';
import './Map.css';

class Map extends Component {
  constructor() {
    super();
    this.state = {
      graphData: {
        labels: ['Scatter'],
        datasets: [
          {
            label: 'Position',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
          },
        ],
      },
      options: {
        animation: { duration: 0 },
        hover: { animationDuration: 0 },
        responsiveAnimationDuration: 0,
        elements: { line: { tension: 0 } },
        scales: {
          xAxes: [{ ticks: { min: 0.00, max: 0.00 } }],
          yAxes: [{ ticks: { min: 0.00, max: 0.00 } }],
        },
        legend: { display: false },
        tooltips: { enabled: false },
      },
    };

    this.setRelative = this.setRelative.bind(this);
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
    if (this.props.simulationTime === 1) {
      this.zoom();
    }

    this.updateMap();
  }

  setRelative() {
    this.a = 1;
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
    const zoomNumber = 0.0001;
    const { latitude, longitude } = this.props.position;
    const { zoomlevel } = this.props;

    const zoom = zoomNumber / (zoomlevel + 1);

    this.setState({
      options: update(this.state.options, {
        scales: {
          xAxes: {
            0: {
              ticks: {
                min: {
                  $set: longitude.length > 0 ?
                    longitude[longitude.length - 1] - (zoom) : 0,
                },
                max: {
                  $set: longitude.length > 0 ?
                    longitude[longitude.length - 1] + (zoom) : 0,
                },
              },
            },
          },
          yAxes: {
            0: {
              ticks: {
                min: {
                  $set: latitude.length > 0 ?
                    latitude[latitude.length - 1] - (zoom) : 0,
                },
                max: {
                  $set: latitude.length > 0 ?
                    latitude[latitude.length - 1] + (zoom) : 0,
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
              <input
                type="button"
                onClick={this.setRelative}
                value="Vessel relative"
                className="btn btn-secondary btn-sm relative-button"
              />
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
});

const mapDispatchToProps = dispatch => ({
  increaseZoomlevel: () => dispatch(increaseZoomlevel()),
  decreaseZoomlevel: () => dispatch(decreaseZoomlevel()),
});

const ConnectedMap = connect(mapStateToProps, mapDispatchToProps)(Map);

Map.propTypes = {
  simulationTime: PropTypes.number.isRequired,
  position: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  zoomlevel: PropTypes.number.isRequired,
  increaseZoomlevel: PropTypes.func.isRequired,
  decreaseZoomlevel: PropTypes.func.isRequired,
};

export default ConnectedMap;
