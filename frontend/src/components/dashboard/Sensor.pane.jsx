import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

/**
 * Class representing a Sensor pane for use on the dashboard.
 * This is a dumb component receiving data as props.
 * @extends Component
*/
class SensorPane extends Component {
  constructor() {
    super();
    this.state = {
      graphData: {
        labels: [],
        datasets: [
          {
            label: 'Roll',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(100,0,100,0.4)',
            borderColor: 'rgba(100,0,100,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(100,0,100,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(100,0,100,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
          },
          {
            label: 'Pitch',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(100,255,255,0.4)',
            borderColor: 'rgba(100,255,255,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(100,255,255,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(100,255,255,1)',
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
        labels: { $set: this.props.timeSeries },
        datasets: {
          0: { data: { $set: this.props.rollSeries } },
          1: { data: { $set: this.props.pitchSeries } },
        },
      }),
      options: update(this.state.options, {
        scales: {
          yAxes: !this.props.isAutoAxis ? {
            $set: [{ ticks: { min: this.props.min, max: this.props.max } }],
          } : {
            $set: [],
          },
        },
      }),
    });
  }

  componentWillReceiveProps(nextProps) {
    const minRoll = Math.min(...nextProps.rollSeries);
    const minPitch = Math.min(...nextProps.pitchSeries);
    const maxRoll = Math.max(...nextProps.rollSeries);
    const maxPitch = Math.max(...nextProps.pitchSeries);
    const minSeries = minRoll < minPitch ? nextProps.rollSeries : nextProps.pitchSeries;
    const maxSeries = maxRoll > maxPitch ? nextProps.rollSeries : nextProps.pitchSeries;

    this.setState({
      graphData: update(this.state.graphData, {
        labels: { $set: nextProps.timeSeries },
        datasets: {
          0: { data: { $set: nextProps.rollSeries } },
          1: { data: { $set: nextProps.pitchSeries } },
        },
      }),
      options: update(this.state.options, {
        scales: {
          yAxes: !nextProps.isAutoAxis ? {
            $set: [{ ticks: { min: nextProps.min, max: nextProps.max } }],
          } : {
            $set: [{
              ticks: {
                min: minSeries.length > 0 ? Math.min(...minSeries) : -1,
                max: maxSeries.length > 0 ? Math.max(...maxSeries) : 1,
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

SensorPane.propTypes = {
  isAutoAxis: PropTypes.bool.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  timeSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  rollSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  pitchSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SensorPane;
