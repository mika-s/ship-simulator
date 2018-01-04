import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Scatter } from 'react-chartjs-2';
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
        animation: {
          duration: 0,
        },
        hover: {
          animationDuration: 0,
        },
        responsiveAnimationDuration: 0,
        elements: {
          line: {
            tension: 0,
          },
        },
        scales: {
          xAxes: [{ ticks: { min: 0.00, max: 10.00 } }],
          yAxes: [{ ticks: { min: 0.00, max: 10.00 } }],
        },
      },
    };
  }

  componentWillMount() {
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

  componentWillReceiveProps() {
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
      options: update(this.state.options, {
        scales: {
          xAxes: {
            0: {
              ticks: {
                min: { $set: merged.length > 0 ? merged[merged.length - 1].x - 0.001 : 0 },
                max: { $set: merged.length > 0 ? merged[merged.length - 1].x + 0.001 : 0 },
              },
            },
          },
          yAxes: {
            0: {
              ticks: {
                min: { $set: merged.length > 0 ? merged[merged.length - 1].y - 0.001 : 0 },
                max: { $set: merged.length > 0 ? merged[merged.length - 1].y + 0.001 : 0 },
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
        <Scatter
          options={this.state.options}
          data={this.state.graphData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  position: state.timeseries.model.position,
});

const mapDispatchToProps = () => ({});

const ConnectedMap = connect(mapStateToProps, mapDispatchToProps)(Map);

Map.propTypes = {
  position: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export default ConnectedMap;
