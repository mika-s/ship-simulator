import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import KinematicsUtil from '../../../util/kinematics.util';
import './CircularSlider.css';

class CircularSlider extends Component {
  static calculateXandY(radius, angle) {
    const x = radius * Math.sin(angle * (Math.PI / 180.0));
    const y = -radius * Math.cos(angle * (Math.PI / 180.0));
    return [{ x, y }];
  }

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const {
      number, demand, feedback, radius, changeDemand,
    } = this.props;

    const innerRadius = radius - 20;
    const demandHandle = CircularSlider.calculateXandY(radius, demand);
    const feedbackHandle = CircularSlider.calculateXandY(innerRadius, feedback);

    function dragstarted() {
      d3.event.sourceEvent.stopPropagation();
      d3.select(this).classed('dragging', true);
    }

    function dragged(d) {
      const distance = Math.sqrt((d3.event.x ** 2) + (d3.event.y ** 2));
      const alpha = Math.acos(d3.event.x / distance);

      d3.select(this)
        .attr('cx', d.x = radius * Math.cos(alpha))
        .attr('cy', d.y = d3.event.y < 0 ? -radius * Math.sin(alpha) : radius * Math.sin(alpha));
    }

    function dragended() {
      const angle =
        KinematicsUtil.transformTo0To360(Math.atan2(d3.event.x, -d3.event.y) * (180.0 / Math.PI));
      changeDemand(Math.round(angle));

      d3.select(this).classed('dragging', false);
    }

    const width = 200;
    const height = 200;

    const drag = d3.drag()
      .subject(d => d)
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);

    const svg = d3.select(`#circle${number}`).append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const container = svg.append('g');

    // Outer circle
    container.append('circle')
      .attr('r', radius)
      .attr('class', 'circumference');

    container.append('g')
      .attr('class', 'dotD')
      .selectAll('circle')
      .data(demandHandle)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .call(drag);

    // Inner circle
    container.append('circle')
      .attr('r', innerRadius)
      .attr('class', 'circumference');

    container.append('g')
      .attr('id', `innercircle${number}`)
      .attr('class', 'dotF')
      .selectAll('circle')
      .data(feedbackHandle)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    // Text
    container.append('text')
      .attr('id', `demandText${number}`)
      .attr('x', -21)
      .attr('y', -5)
      .text(`d: ${demand}°`);

    container.append('text')
      .attr('id', `feedbackText${number}`)
      .attr('x', -17)
      .attr('y', 15)
      .text(`f: ${feedback}°`);
  }

  componentWillReceiveProps(nextProps) {
    const {
      number, demand, feedback, radius,
    } = nextProps;
    const innerRadius = radius - 20;
    const feedbackHandle = CircularSlider.calculateXandY(innerRadius, feedback);

    d3.select(`#innercircle${number}`)
      .selectAll('circle')
      .attr('cx', feedbackHandle[0].x)
      .attr('cy', feedbackHandle[0].y);

    d3.selectAll(`#demandText${number}`)
      .text(`d: ${demand}°`);

    d3.select(`#feedbackText${number}`)
      .text(`f: ${feedback}°`);
  }

  render() {
    const { number } = this.props;

    return (<div id={`circle${number}`} />);
  }
}

CircularSlider.defaultProps = {
  radius: 70,
};

CircularSlider.propTypes = {
  radius: PropTypes.number,
  number: PropTypes.number.isRequired,
  demand: PropTypes.number.isRequired,
  feedback: PropTypes.number.isRequired,
  changeDemand: PropTypes.func.isRequired,
};

export default CircularSlider;
