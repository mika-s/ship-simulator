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

  toggleActivate() {
    this.props.toggleAutopilot();
  }

  render() {
    const {
      initialHeading, initialSpeed, setAutopilotHeading, setAutopilotSpeed,
      initialAlpha, initialBeta, setAlphaForHeading, setBetaForHeading,
      initialHeadingGain, setAutopilotPgain, setAutopilotIgain, setAutopilotDgain,
      initialSpeedGain, setSpeedPgain, setSpeedIgain, setSpeedDgain,
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
          <div className="col-lg-3">
            <Pid
              name="Heading"
              initialP={initialHeadingGain.p}
              initialI={initialHeadingGain.i}
              initialD={initialHeadingGain.d}
              setP={setAutopilotPgain}
              setI={setAutopilotIgain}
              setD={setAutopilotDgain}
              min={{ p: 0.0, i: 0.0, d: 0.0 }}
              max={{ p: 5.0, i: 2.0, d: 5.0 }}
            />
          </div>

          <div className="col-lg-3">
            <Pid
              name="Speed"
              initialP={initialSpeedGain.p}
              initialI={initialSpeedGain.i}
              initialD={initialSpeedGain.d}
              setP={setSpeedPgain}
              setI={setSpeedIgain}
              setD={setSpeedDgain}
              min={{ p: 0.0, i: 0.0, d: 0.0 }}
              max={{ p: 20.0, i: 5.0, d: 20.0 }}
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
  initialSpeedGain: PropTypes.shape({
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
  setSpeedPgain: PropTypes.func.isRequired,
  setSpeedIgain: PropTypes.func.isRequired,
  setSpeedDgain: PropTypes.func.isRequired,
  toggleAutopilot: PropTypes.func.isRequired,
};

export default Autopilot;
