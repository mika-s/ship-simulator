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
      orientation, min, max, disabled,
    } = this.props;

    return (
      <div className={orientation === 'vertical' ? 'linear-slider-vertical' : 'linear-slider-horizontal'}>
        <div className="row">
          <div className="col-lg-6">
            <input
              type="range"
              min={min}
              max={max}
              value={this.state.value}
              onChange={this.handleOnChange}
              onMouseUp={this.handleOnMouseUp}
              disabled={disabled}
            />
          </div>
          <div className="col-lg-6">
            {this.state.value}
          </div>
        </div>
      </div>
    );
  }
}

LinearSlider.defaultProps = {
  min: -100,
  max: 100,
  disabled: false,
};

LinearSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  orientation: PropTypes.string.isRequired,
  initialValue: PropTypes.number.isRequired,
  changeDemand: PropTypes.func.isRequired,
};

export default LinearSlider;
