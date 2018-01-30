import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Control.css';

class Setpoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: props.initialHeading,
      speed: props.initialSpeed,
    };

    this.setAutopilotHeading = this.setAutopilotHeading.bind(this);
    this.setAutopilotSpeed = this.setAutopilotSpeed.bind(this);
    this.handleHeadingChange = this.handleHeadingChange.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
  }

  setAutopilotHeading(event) {
    event.preventDefault();
    this.props.setAutopilotHeading(this.state.heading);
  }

  setAutopilotSpeed(event) {
    event.preventDefault();
    this.props.setAutopilotSpeed(this.state.speed);
  }

  handleHeadingChange(event) {
    const parsedHeading = Number.parseFloat(event.target.value);
    this.setState({ heading: parsedHeading });
  }

  handleSpeedChange(event) {
    const parsedSpeed = Number.parseFloat(event.target.value);
    this.setState({ speed: parsedSpeed });
  }

  render() {
    return (
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
    );
  }
}

Setpoints.propTypes = {
  initialHeading: PropTypes.number.isRequired,
  initialSpeed: PropTypes.number.isRequired,
  setAutopilotHeading: PropTypes.func.isRequired,
  setAutopilotSpeed: PropTypes.func.isRequired,
};

export default Setpoints;
