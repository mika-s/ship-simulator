import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinearSlider from '../LinearSlider/LinearSlider';
import LinearGauge from '../LinearGauge/LinearGauge';
import './TunnelThruster.css';

class TunnelThruster extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.changeDemand = this.changeDemand.bind(this);
  }

  changeDemand(value) {
    const { number, controlType } = this.props.thrusterData;
    const demandFactor = Number.parseFloat(value) / 100.0;

    this.props.setThrusterDemand(number, controlType, demandFactor);
  }

  render() {
    const {
      name, demand, feedback, controlType,
    } = this.props.thrusterData;

    return (
      <div className="tunnel-thruster">
        <div className="card w-25">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>

            <div className="row no-padding">
              <div className="col-lg-5">
                Demand:
              </div>
              <div className="col-lg-7">
                <LinearSlider
                  initialValue={demand[controlType]}
                  orientation="horizontal"
                  changeDemand={this.changeDemand}
                />
              </div>
            </div>
            <div className="row no-padding">
              <div className="col-lg-5">
                Feedback:
              </div>
              <div className="col-lg-7">
                <LinearGauge
                  value={feedback[controlType]}
                  orientation="horizontal"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TunnelThruster.defaultProps = {};

TunnelThruster.propTypes = {
  thrusterData: PropTypes.shape({
    number: PropTypes.number,
    name: PropTypes.string,
    thrusterType: PropTypes.string,
    controlType: PropTypes.string,
    maxPower: PropTypes.object,
    location: PropTypes.object,
    risetimes: PropTypes.object,
    force: PropTypes.number,
    power: PropTypes.number,
    demand: PropTypes.object,
    feedback: PropTypes.object,
  }).isRequired,
  setThrusterDemand: PropTypes.func.isRequired,
};

export default TunnelThruster;
