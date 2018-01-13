import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LinearSlider.css';

class LinearSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue * 100,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
  }

  handleOnChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({ value });
  }

  handleOnMouseUp = (event) => {
    event.preventDefault();
    this.props.changeDemand(this.state.value);
  }

  render() {
    const {
      orientation, min, max,
    } = this.props;

    return (
      <div className={orientation === 'vertical' ? 'linear-slider-vertical' : 'linear-slider-horizontal'}>
        <input
          type="range"
          min={min}
          max={max}
          value={this.state.value}
          onChange={this.handleOnChange}
          onMouseUp={this.handleOnMouseUp}
        />
        {this.state.value}
      </div>
    );
  }
}

LinearSlider.defaultProps = {
  min: -100,
  max: 100,
};

LinearSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  orientation: PropTypes.string.isRequired,
  initialValue: PropTypes.number.isRequired,
  changeDemand: PropTypes.func.isRequired,
};

export default LinearSlider;
