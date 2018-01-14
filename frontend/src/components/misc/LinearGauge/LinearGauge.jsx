import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LinearGauge.css';

class LinearGauge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      orientation, min, max, disabled, value,
    } = this.props;

    const displayValue = (value * 100).toFixed(0);

    let output;
    if (orientation === 'vertical') {
      output = (
        <div className="linear-slider-vertical">
          <div className="row no-padding" style={{ height: 150 }}>
            <div className="col-lg-12">
              <input
                type="range"
                min={min}
                max={max}
                value={value * 100}
                disabled={disabled}
              />
            </div>
          </div>
          <div className="row no-padding">
            <div className="col-lg-12">
              {displayValue} %
            </div>
          </div>
        </div>
      );
    } else {
      output = (
        <div className="linear-slider-horizontal">
          <div className="row no-padding">
            <div className="col-lg-9">
              <input
                type="range"
                min={min}
                max={max}
                value={value * 100}
                disabled={disabled}
              />
            </div>
            <div className="col-lg-3">
              {displayValue} %
            </div>
          </div>
        </div>
      );
    }

    return output;
  }
}

LinearGauge.defaultProps = {
  min: -100,
  max: 100,
  disabled: false,
};

LinearGauge.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  orientation: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default LinearGauge;
