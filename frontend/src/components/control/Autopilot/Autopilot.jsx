import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alphabeta from './Alphabeta';
import Setpoints from './Setpoints';
import '../Control.css';

class Autopilot extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.setActiveButtonColor = this.setActiveButtonColor.bind(this);
    this.setAutopilotHeading = this.setAutopilotHeading.bind(this);
    this.setAutopilotSpeed = this.setAutopilotSpeed.bind(this);
    this.setAlphaForHeading = this.setAlphaForHeading.bind(this);
    this.setBetaForHeading = this.setBetaForHeading.bind(this);
    this.toggleActivate = this.toggleActivate.bind(this);
  }

  setActiveButtonColor() {
    let cssClass;
    if (this.props.active) {
      cssClass = 'btn btn-success';
    } else {
      cssClass = 'btn btn-outline-success';
    }

    return cssClass;
  }

  setAutopilotHeading(event) {
    event.preventDefault();
    this.props.setAutopilotHeading(this.state.heading);
  }

  setAutopilotSpeed(event) {
    event.preventDefault();
    this.props.setAutopilotSpeed(this.state.speed);
  }

  setAlphaForHeading(event) {
    event.preventDefault();
    this.props.setAlphaForHeading(this.state.alpha);
  }

  setBetaForHeading(event) {
    event.preventDefault();
    this.props.setBetaForHeading(this.state.beta);
  }

  toggleActivate() {
    this.props.toggleAutopilot();
  }

  render() {
    const {
      initialHeading, initialSpeed, setAutopilotHeading, setAutopilotSpeed,
      initialAlpha, initialBeta, setAlphaForHeading, setBetaForHeading,
    } = this.props;

    return (
      <div className="autopilot">

        <div className="row">
          <div className="col-lg-3">
            <Setpoints
              initialHeading={initialHeading}
              initialSpeed={initialSpeed}
              setAutopilotHeading={setAutopilotHeading}
              setAutopilotSpeed={setAutopilotSpeed}
            />
          </div>

          <div className="col-lg-4">
            <Alphabeta
              initialAlpha={initialAlpha}
              initialBeta={initialBeta}
              setAlphaForHeading={setAlphaForHeading}
              setBetaForHeading={setBetaForHeading}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            {this.props.active}
            <button className={this.setActiveButtonColor()} onClick={this.toggleActivate} type="button">Activate</button>
          </div>
        </div>

      </div>
    );
  }
}

Autopilot.propTypes = {
  active: PropTypes.bool.isRequired,
  initialHeading: PropTypes.number.isRequired,
  initialSpeed: PropTypes.number.isRequired,
  initialAlpha: PropTypes.number.isRequired,
  initialBeta: PropTypes.number.isRequired,
  setAutopilotHeading: PropTypes.func.isRequired,
  setAutopilotSpeed: PropTypes.func.isRequired,
  setAlphaForHeading: PropTypes.func.isRequired,
  setBetaForHeading: PropTypes.func.isRequired,
  toggleAutopilot: PropTypes.func.isRequired,
};

export default Autopilot;
