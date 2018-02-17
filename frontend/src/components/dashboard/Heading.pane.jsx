import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

/**
 * Class representing a Heading pane for use on the dashboard.
 * This is a dumb component receiving data as props.
 * @extends Component
*/
class HeadingPane extends Component {
  constructor() {
    super();
    this.state = {
      graphData: {
        labels: [],
        datasets: [
          {
            label: 'Heading',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(255,0,0,0.4)',
            borderColor: 'rgba(255,0,0,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(255,0,0,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255,0,0,1)',
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
        scales: {
          yAxes: [],
        },
        responsiveAnimationDuration: 0,
        elements: {
          line: {
            tension: 0,
          },
        },
      },
    };
  }

  componentWillMount() {
    this.setState({
      graphData: update(this.state.graphData, {
        labels: { $set: this.props.simulationTimeSeries },
        datasets: { 0: { data: { $set: this.props.headingSeries } } },
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
    this.setState({
      graphData: update(this.state.graphData, {
        labels: { $set: nextProps.simulationTimeSeries },
        datasets: { 0: { data: { $set: nextProps.headingSeries } } },
      }),
      options: update(this.state.options, {
        scales: {
          yAxes: !nextProps.isAutoAxis ? {
            $set: [{ ticks: { min: nextProps.min, max: nextProps.max } }],
          } : {
            $set: [{
              ticks: {
                min: nextProps.headingSeries.length > 0 ? Math.min(...nextProps.headingSeries) : -1,
                max: nextProps.headingSeries.length > 0 ? Math.max(...nextProps.headingSeries) : 1,
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

HeadingPane.propTypes = {
  isAutoAxis: PropTypes.bool.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  simulationTimeSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  headingSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default HeadingPane;
