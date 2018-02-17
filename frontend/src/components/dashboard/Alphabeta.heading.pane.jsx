import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

/**
 * Class representing a Alphabeta heading pane for use on the dashboard.
 * It shows a graph with heading and ROT from the alphabeta filter.
 * This is a dumb component receiving data as props.
 * @extends Component
*/
class AlphabetaHeadingPane extends Component {
  constructor() {
    super();
    this.state = {
      graphData: {
        labels: [],
        datasets: [
          {
            label: 'Heading',
            yAxisID: 'heading-axis',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(244,229,66,0.4)',
            borderColor: 'rgba(244,229,66,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(244,229,66,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(244,229,66,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
          },
          {
            label: 'ROT',
            yAxisID: 'rot-axis',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(63,44,22,0.4)',
            borderColor: 'rgba(63,44,22,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(63,44,22,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(63,44,22,1)',
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
          0: { data: { $set: this.props.headingSeries } },
          1: { data: { $set: this.props.rotSeries } },
        },
      }),
      options: update(this.state.options, {
        scales: {
          yAxes: !this.props.isAutoAxis ? {
            $set: [{
              id: 'heading-axis',
              type: 'linear',
              position: 'left',
              ticks: { min: this.props.min, max: this.props.max },
            }, {
              id: 'rot-axis',
              type: 'linear',
              position: 'right',
              ticks: { min: this.props.min2, max: this.props.max2 },
            }],
          } : {
            $set: [{
              id: 'heading-axis',
              type: 'linear',
              position: 'left',
            }, {
              id: 'rot-axis',
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
          0: { data: { $set: nextProps.headingSeries } },
          1: { data: { $set: nextProps.rotSeries } },
        },
      }),
      options: update(this.state.options, {
        scales: {
          yAxes: !nextProps.isAutoAxis ? {
            $set: [{
              id: 'heading-axis',
              type: 'linear',
              position: 'left',
              ticks: { min: nextProps.min, max: nextProps.max },
            }, {
              id: 'rot-axis',
              type: 'linear',
              position: 'right',
              ticks: { min: nextProps.min2, max: nextProps.max2 },
            }],
          } : {
            $set: [{
              id: 'heading-axis',
              type: 'linear',
              position: 'left',
              ticks: {
                min: nextProps.headingSeries.length > 0 ?
                  Math.min(...nextProps.headingSeries) : -1,
                max: nextProps.headingSeries.length > 0 ?
                  Math.max(...nextProps.headingSeries) : 1,
              },
            }, {
              id: 'rot-axis',
              type: 'linear',
              position: 'right',
              ticks: {
                min: nextProps.rotSeries.length > 0 ?
                  Math.min(...nextProps.rotSeries) : -1,
                max: nextProps.rotSeries.length > 0 ?
                  Math.max(...nextProps.rotSeries) : 1,
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

AlphabetaHeadingPane.propTypes = {
  isAutoAxis: PropTypes.bool.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  min2: PropTypes.number.isRequired,
  max2: PropTypes.number.isRequired,
  simulationTimeSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  headingSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  rotSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default AlphabetaHeadingPane;
