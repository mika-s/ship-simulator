import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alphabeta from './Alphabeta';
import Setpoints from './Setpoints';
import Pid from './Pid';
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
    this.setP = this.setP.bind(this);
    this.setI = this.setI.bind(this);
    this.setD = this.setD.bind(this);
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

  /* Delete these functions? */
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

  setP(event) {
    event.preventDefault();
    this.props.setAutopilotPgain(this.state.p);
  }

  setI(event) {
    event.preventDefault();
    this.props.setAutopilotIgain(this.state.i);
  }

  setD(event) {
    event.preventDefault();
    this.props.setAutopilotDgain(this.state.d);
  }

  toggleActivate() {
    this.props.toggleAutopilot();
  }

  render() {
    const {
      initialHeading, initialSpeed, setAutopilotHeading, setAutopilotSpeed,
      initialAlpha, initialBeta, setAlphaForHeading, setBetaForHeading,
      initialHeadingGain, setAutopilotPgain, setAutopilotIgain, setAutopilotDgain,
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
          <div className="col-lg-4">
            <Pid
              name="Heading"
              initialP={initialHeadingGain.p}
              initialI={initialHeadingGain.i}
              initialD={initialHeadingGain.d}
              setP={setAutopilotPgain}
              setI={setAutopilotIgain}
              setD={setAutopilotDgain}
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
  initialHeadingGain: PropTypes.shape({
    p: PropTypes.number.isRequired,
    i: PropTypes.number.isRequired,
    d: PropTypes.number.isRequired,
  }).isRequired,
  setAutopilotHeading: PropTypes.func.isRequired,
  setAutopilotSpeed: PropTypes.func.isRequired,
  setAlphaForHeading: PropTypes.func.isRequired,
  setBetaForHeading: PropTypes.func.isRequired,
  setAutopilotPgain: PropTypes.func.isRequired,
  setAutopilotIgain: PropTypes.func.isRequired,
  setAutopilotDgain: PropTypes.func.isRequired,
  toggleAutopilot: PropTypes.func.isRequired,
};

export default Autopilot;
