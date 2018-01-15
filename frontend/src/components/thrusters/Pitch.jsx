import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Thrusters.css';

class Pitch extends Component {
  constructor() {
    super();
    this.state = { manualPitch: 0.0 };

    this.handlePitchChange = this.handlePitchChange.bind(this);
    this.changeManualPitchDemand = this.changeManualPitchDemand.bind(this);
  }

  handlePitchChange(event) { this.setState({ manualPitch: event.target.value }); }

  changeManualPitchDemand(event) {
    event.preventDefault();
    const manualPitchFactor = Number.parseFloat(this.state.manualPitch) / 100.0;

    this.props.setThrusterDemand(this.props.number, 'pitch', manualPitchFactor);
  }

  render() {
    const displayPitchDemand = (this.props.demand * 100.0).toFixed(2);
    const displayPitchFeedback = (this.props.feedback * 100.0).toFixed(2);

    return (
      <tr>
        <td>Pitch demand</td>
        <td>{displayPitchDemand} %</td>
        <td>
          <form className="form-inline" onSubmit={this.changeManualPitchDemand}>
            <input
              type="number"
              min="-100"
              max="100"
              step="0.1"
              defaultValue={this.props.demand * 100.0}
              onChange={this.handlePitchChange}
              style={{ width: 70, marginLeft: 15 }}
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              required
            />
            <button className="btn btn-secondary btn-sm" type="submit">Set</button>
          </form>
        </td>
        <td>Pitch feedback</td>
        <td>{displayPitchFeedback} %</td>
      </tr>
    );
  }
}

Pitch.propTypes = {
  demand: PropTypes.number.isRequired,
  feedback: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  setThrusterDemand: PropTypes.func.isRequired,
};

export default Pitch;
