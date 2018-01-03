import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

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
      },
    };
  }

  componentWillMount() {
    this.setState({
      graphData: update(this.state.graphData, {
        labels: { $set: this.props.simulationTimeSeries },
        datasets: { 0: { data: { $set: this.props.headingSeries } } },
      }),
    });
  }

  componentWillReceiveProps() {
    this.setState({
      graphData: update(this.state.graphData, {
        labels: { $set: this.props.simulationTimeSeries },
        datasets: { 0: { data: { $set: this.props.headingSeries } } },
      }),
    });
  }

  render() {
    return (
      <Line
        width={400}
        options={this.state.options}
        data={this.state.graphData}
      />
    );
  }
}

HeadingPane.propTypes = {
  simulationTimeSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  headingSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default HeadingPane;
