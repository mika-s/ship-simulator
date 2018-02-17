import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

/**
 * Class representing a PID pane for use on the dashboard.
 * This is a dumb component receiving data as props.
 * @extends Component
*/
class PidPane extends Component {
  constructor() {
    super();
    this.state = {
      graphData: {
        labels: [],
        datasets: [
          {
            label: 'P',
            yAxisID: 'p-axis',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(69,32,117,0.4)',
            borderColor: 'rgba(69,32,117,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(69,32,117,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(69,32,117,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
          },
          {
            label: 'I',
            yAxisID: 'i-axis',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(32,117,85,0.4)',
            borderColor: 'rgba(32,117,85,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(32,117,85,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(32,117,85,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
          },
          {
            label: 'D',
            yAxisID: 'd-axis',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(255,117,85,0.4)',
            borderColor: 'rgba(255,117,85,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(255,117,85,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255,117,85,1)',
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
          0: { data: { $set: this.props.pSeries } },
          1: { data: { $set: this.props.iSeries } },
          2: { data: { $set: this.props.dSeries } },
        },
      }),
      options: update(this.state.options, {
        scales: {
          yAxes: !this.props.isAutoAxis ? {
            $set: [{
              id: 'i-axis',
              type: 'linear',
              position: 'left',
              ticks: { min: this.props.min2, max: this.props.max2 },
            }, {
              id: 'p-axis',
              type: 'linear',
              position: 'left',
              ticks: { min: this.props.min, max: this.props.max },
            }, {
              id: 'd-axis',
              type: 'linear',
              position: 'right',
              ticks: { min: this.props.min3, max: this.props.max3 },
            }],
          } : {
            $set: [{
              id: 'i-axis',
              type: 'linear',
              position: 'left',
            }, {
              id: 'p-axis',
              type: 'linear',
              position: 'left',
            }, {
              id: 'd-axis',
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
          0: { data: { $set: nextProps.pSeries } },
          1: { data: { $set: nextProps.iSeries } },
          2: { data: { $set: nextProps.dSeries } },
        },
      }),
      options: update(this.state.options, {
        scales: {
          yAxes: !nextProps.isAutoAxis ? {
            $set: [{
              id: 'i-axis',
              type: 'linear',
              position: 'left',
              ticks: { min: nextProps.min2, max: nextProps.max2 },
            }, {
              id: 'p-axis',
              type: 'linear',
              position: 'left',
              ticks: { min: nextProps.min, max: nextProps.max },
            }, {
              id: 'd-axis',
              type: 'linear',
              position: 'right',
              ticks: { min: nextProps.min3, max: nextProps.max3 },
            }],
          } : {
            $set: [{
              id: 'i-axis',
              type: 'linear',
              position: 'left',
              ticks: {
                min: nextProps.iSeries.length > 0 ?
                  Math.min(...nextProps.iSeries) : -1,
                max: nextProps.iSeries.length > 0 ?
                  Math.max(...nextProps.iSeries) : 1,
              },
            }, {
              id: 'p-axis',
              type: 'linear',
              position: 'left',
              ticks: {
                min: nextProps.pSeries.length > 0 ?
                  Math.min(...nextProps.pSeries) : -1,
                max: nextProps.pSeries.length > 0 ?
                  Math.max(...nextProps.pSeries) : 1,
              },
            }, {
              id: 'd-axis',
              type: 'linear',
              position: 'right',
              ticks: {
                min: nextProps.dSeries.length > 0 ?
                  Math.min(...nextProps.dSeries) : -1,
                max: nextProps.dSeries.length > 0 ?
                  Math.max(...nextProps.dSeries) : 1,
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

PidPane.propTypes = {
  isAutoAxis: PropTypes.bool.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  min2: PropTypes.number.isRequired,
  max2: PropTypes.number.isRequired,
  min3: PropTypes.number.isRequired,
  max3: PropTypes.number.isRequired,
  simulationTimeSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  pSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  iSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  dSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default PidPane;
