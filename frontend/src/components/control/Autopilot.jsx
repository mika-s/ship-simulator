import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Control.css';

class Autopilot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: props.initialHeading,
      speed: props.initialSpeed,
      alpha: props.initialAlpha,
      beta: props.initialBeta,
    };

    this.setActiveButtonColor = this.setActiveButtonColor.bind(this);
    this.handleHeadingChange = this.handleHeadingChange.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleAlphaChange = this.handleAlphaChange.bind(this);
    this.handleBetaChange = this.handleBetaChange.bind(this);
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

  handleHeadingChange(event) {
    const parsedHeading = Number.parseFloat(event.target.value);
    this.setState({ heading: parsedHeading });
  }

  handleSpeedChange(event) {
    const parsedSpeed = Number.parseFloat(event.target.value);
    this.setState({ speed: parsedSpeed });
  }

  handleAlphaChange(event) {
    const parsedAlpha = Number.parseFloat(event.target.value);
    this.setState({ alpha: parsedAlpha });
  }

  handleBetaChange(event) {
    const parsedBeta = Number.parseFloat(event.target.value);
    this.setState({ beta: parsedBeta });
  }

  toggleActivate() {
    this.props.toggleAutopilot();
  }

  render() {
    return (
      <div className="autopilot">

        <div className="row">
          <div className="col-lg-3">
            <div className="card" style={{ marginTop: 20, marginBottom: 20 }}>
              <div className="card-body">
                <h4 className="card-title">Setpoints</h4>
                <h6 className="card-subtitle mb-2 text-muted">Heading</h6>

                <form className="form-inline" onSubmit={this.setAutopilotHeading}>
                  <input
                    type="number"
                    min="0"
                    max="360"
                    step="0.1"
                    value={this.state.heading}
                    onChange={this.handleHeadingChange}
                    style={{ width: 80, marginLeft: 15 }}
                    className="form-control mb-2 mr-sm-2 mb-sm-0"
                    required
                  />
                  <button className="btn btn-secondary btn-sm" type="submit">Set</button>
                </form>

                <h6 className="card-subtitle mb-2 text-muted" style={{ marginTop: 20 }}>Speed</h6>
                <form className="form-inline" onSubmit={this.setAutopilotSpeed}>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.1"
                    value={this.state.speed}
                    onChange={this.handleSpeedChange}
                    style={{ width: 80, marginLeft: 15 }}
                    className="form-control mb-2 mr-sm-2 mb-sm-0"
                    required
                  />
                  <button className="btn btn-secondary btn-sm" type="submit">Set</button>
                </form>

              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card" style={{ marginTop: 20, marginBottom: 20 }}>
              <div className="card-body">
                <h4 className="card-title">Alphabeta estimator</h4>
                <h6 className="card-subtitle mb-2 text-muted">Alpha</h6>

                <form className="form-inline" onSubmit={this.setAlphaForHeading}>
                  <input
                    type="number"
                    min="0"
                    max="2"
                    step="0.01"
                    value={this.state.alpha}
                    onChange={this.handleAlphaChange}
                    style={{ width: 80, marginLeft: 15 }}
                    className="form-control mb-2 mr-sm-2 mb-sm-0"
                    required
                  />
                  <button className="btn btn-secondary btn-sm" type="submit">Set</button>
                </form>

                <h6 className="card-subtitle mb-2 text-muted" style={{ marginTop: 20 }}>Beta</h6>
                <form className="form-inline" onSubmit={this.setBetaForHeading}>
                  <input
                    type="number"
                    min="0"
                    max="2"
                    step="0.01"
                    value={this.state.beta}
                    onChange={this.handleBetaChange}
                    style={{ width: 80, marginLeft: 15 }}
                    className="form-control mb-2 mr-sm-2 mb-sm-0"
                    required
                  />
                  <button className="btn btn-secondary btn-sm" type="submit">Set</button>
                </form>

              </div>
            </div>
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
