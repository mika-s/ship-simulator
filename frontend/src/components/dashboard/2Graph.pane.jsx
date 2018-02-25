import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

/**
 * Class representing a pane, containing a graph with two axes, for use on the dashboard.
 * This is a dumb component receiving data as props.
 * @extends Component
*/
class TwoGraphPane extends Component {
  constructor(props) {
    super(props);

    const { r: r1, g: g1, b: b1 } = props.color1;
    const { r: r2, g: g2, b: b2 } = props.color2;
    const { firstLabel, secondLabel } = props;

    this.state = {
      graphData: {
        labels: [],
        datasets: [
          {
            label: firstLabel,
            yAxisID: 'first-axis',
            fill: false,
            lineTension: 0.1,
            backgroundColor: `rgba(${r1},${g1},${b1},0.4)`,
            borderColor: `rgba(${r1},${g1},${b1},1)`,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: `rgba(${r1},${g1},${b1},1)`,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: `rgba(${r1},${g1},${b1},1)`,
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
          },
          {
            label: secondLabel,
            yAxisID: 'second-axis',
            fill: false,
            lineTension: 0.1,
            backgroundColor: `rgba(${r2},${g2},${b2},0.4)`,
            borderColor: `rgba(${r2},${g2},${b2},1)`,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: `rgba(${r2},${g2},${b2},1)`,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: `rgba(${r2},${g2},${b2},1)`,
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
          0: { data: { $set: this.props.firstSeries } },
          1: { data: { $set: this.props.secondSeries } },
        },
      }),
      options: update(this.state.options, {
        scales: {
          yAxes: !this.props.isAutoAxis ? {
            $set: [{
              id: 'first-axis',
              type: 'linear',
              position: 'left',
              ticks: { min: this.props.min, max: this.props.max },
            }, {
              id: 'second-axis',
              type: 'linear',
              position: 'right',
              ticks: { min: this.props.min2, max: this.props.max2 },
            }],
          } : {
            $set: [{
              id: 'first-axis',
              type: 'linear',
              position: 'left',
            }, {
              id: 'second-axis',
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
        labels: { $set: nextProps.timeSeries },
        datasets: {
          0: { data: { $set: nextProps.firstSeries } },
          1: { data: { $set: nextProps.secondSeries } },
        },
      }),
      options: update(this.state.options, {
        scales: {
          yAxes: !nextProps.isAutoAxis ? {
            $set: [{
              id: 'first-axis',
              type: 'linear',
              position: 'left',
              ticks: { min: nextProps.min, max: nextProps.max },
            }, {
              id: 'second-axis',
              type: 'linear',
              position: 'right',
              ticks: { min: nextProps.min2, max: nextProps.max2 },
            }],
          } : {
            $set: [{
              id: 'first-axis',
              type: 'linear',
              position: 'left',
              ticks: {
                min: nextProps.firstSeries.length > 0 ?
                  Math.min(...nextProps.firstSeries) : -1,
                max: nextProps.firstSeries.length > 0 ?
                  Math.max(...nextProps.firstSeries) : 1,
              },
            }, {
              id: 'second-axis',
              type: 'linear',
              position: 'right',
              ticks: {
                min: nextProps.secondSeries.length > 0 ?
                  Math.min(...nextProps.secondSeries) : -1,
                max: nextProps.secondSeries.length > 0 ?
                  Math.max(...nextProps.secondSeries) : 1,
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

TwoGraphPane.propTypes = {
  isAutoAxis: PropTypes.bool.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  min2: PropTypes.number.isRequired,
  max2: PropTypes.number.isRequired,
  firstLabel: PropTypes.string.isRequired,
  secondLabel: PropTypes.string.isRequired,
  color1: PropTypes.shape({
    r: PropTypes.number.isRequired,
    g: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
  }).isRequired,
  color2: PropTypes.shape({
    r: PropTypes.number.isRequired,
    g: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
  }).isRequired,
  timeSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  firstSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  secondSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default TwoGraphPane;
