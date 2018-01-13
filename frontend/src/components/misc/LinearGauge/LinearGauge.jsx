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

    return (
      <div className={orientation === 'vertical' ? 'linear-slider-vertical' : 'linear-slider-horizontal'}>
        <div className="row">
          <div className="col-lg-6">
            <input
              type="range"
              min={min}
              max={max}
              value={value * 100}
              disabled={disabled}
            />
          </div>
          <div className="col-lg-6">
            {value}
          </div>
        </div>
      </div>
    );
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
