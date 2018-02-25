import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

/**
 * Class representing a pane, containing a graph with one axis, for use on the dashboard.
 * This is a dumb component receiving data as props.
 * @extends Component
*/
class OneGraphPane extends Component {
  constructor(props) {
    super(props);

    const { r: r1, g: g1, b: b1 } = props.color1;
    const { firstLabel } = props;

    this.state = {
      graphData: {
        labels: [],
        datasets: [
          {
            label: firstLabel,
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
        labels: { $set: this.props.timeSeries },
        datasets: { 0: { data: { $set: this.props.firstSeries } } },
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
        labels: { $set: nextProps.timeSeries },
        datasets: { 0: { data: { $set: nextProps.firstSeries } } },
      }),
      options: update(this.state.options, {
        scales: {
          yAxes: !nextProps.isAutoAxis ? {
            $set: [{ ticks: { min: nextProps.min, max: nextProps.max } }],
          } : {
            $set: [{
              ticks: {
                min: nextProps.firstSeries.length > 0 ? Math.min(...nextProps.firstSeries) : -1,
                max: nextProps.firstSeries.length > 0 ? Math.max(...nextProps.firstSeries) : 1,
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

OneGraphPane.propTypes = {
  isAutoAxis: PropTypes.bool.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  firstLabel: PropTypes.string.isRequired,
  color1: PropTypes.shape({
    r: PropTypes.number.isRequired,
    g: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
  }).isRequired,
  timeSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  firstSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default OneGraphPane;
