import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

/**
 * Class representing a Position pane for use on the dashboard.
 * This is a dumb component receiving data as props.
 * @extends Component
*/
class PositionPane extends Component {
  constructor() {
    super();
    this.state = {
      graphData: {
        labels: [],
        datasets: [
          {
            label: 'Latitude',
            yAxisID: 'latitude-axis',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderColor: 'rgba(0,0,0,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(0,0,0,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(0,0,0,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
          },
          {
            label: 'Longitude',
            yAxisID: 'longitude-axis',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(0,255,0,0.4)',
            borderColor: 'rgba(0,255,0,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(0,255,0,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(0,255,0,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
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
          yAxes: [],
        },
      },
    };
  }

  componentWillMount() {
    this.setState({
      graphData: update(this.state.graphData, {
        labels: { $set: this.props.simulationTimeSeries },
        datasets: {
          0: { data: { $set: this.props.latitudeSeries } },
          1: { data: { $set: this.props.longitudeSeries } },
        },
      }),
      options: update(this.state.options, {
        scales: {
          yAxes: !this.props.isAutoAxis ? {
            $set: [{
              id: 'latitude-axis',
              type: 'linear',
              position: 'left',
              ticks: { min: this.props.min, max: this.props.max },
            }, {
              id: 'longitude-axis',
              type: 'linear',
              position: 'right',
              ticks: { min: this.props.min2, max: this.props.max2 },
            }],
          } : {
            $set: [{
              id: 'latitude-axis',
              type: 'linear',
              position: 'left',
            }, {
              id: 'longitude-axis',
              type: 'linear',
              position: 'right',
            }],
          },
        },
      }),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      graphData: update(this.state.graphData, {
        labels: { $set: nextProps.simulationTimeSeries },
        datasets: {
          0: { data: { $set: nextProps.latitudeSeries } },
          1: { data: { $set: nextProps.longitudeSeries } },
        },
      }),
      options: update(this.state.options, {
        scales: {
          yAxes: !nextProps.isAutoAxis ? {
            $set: [{
              id: 'latitude-axis',
              type: 'linear',
              position: 'left',
              ticks: { min: nextProps.min, max: nextProps.max },
            }, {
              id: 'longitude-axis',
              type: 'linear',
              position: 'right',
              ticks: { min: nextProps.min2, max: nextProps.max2 },
            }],
          } : {
            $set: [{
              id: 'latitude-axis',
              type: 'linear',
              position: 'left',
              ticks: {
                min: nextProps.latitudeSeries.length > 0 ?
                  Math.min(...nextProps.latitudeSeries) : -1,
                max: nextProps.latitudeSeries.length > 0 ?
                  Math.max(...nextProps.latitudeSeries) : 1,
              },
            }, {
              id: 'longitude-axis',
              type: 'linear',
              position: 'right',
              ticks: {
                min: nextProps.longitudeSeries.length > 0 ?
                  Math.min(...nextProps.longitudeSeries) : -1,
                max: nextProps.longitudeSeries.length > 0 ?
                  Math.max(...nextProps.longitudeSeries) : 1,
              },
            }],
          },
        },
      }),
    });
  }

  render() {
    return (
      <Line
        width={400}
        height={277}
        options={this.state.options}
        data={this.state.graphData}
      />
    );
  }
}

PositionPane.propTypes = {
  isAutoAxis: PropTypes.bool.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  min2: PropTypes.number.isRequired,
  max2: PropTypes.number.isRequired,
  simulationTimeSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  latitudeSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  longitudeSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default PositionPane;
