import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Thrusters.css';

class Rpm extends Component {
  constructor() {
    super();
    this.state = { manualRpm: 0.0 };

    this.handleRpmChange = this.handleRpmChange.bind(this);
    this.changeManualRpmDemand = this.changeManualRpmDemand.bind(this);
  }

  handleRpmChange(event) { this.setState({ manualRpm: event.target.value }); }

  changeManualRpmDemand(event) {
    event.preventDefault();
    const manualRpmFactor = Number.parseFloat(this.state.manualRpm) / 100.0;

    this.props.setThrusterDemand(this.props.number, 'rpm', manualRpmFactor);
  }

  render() {
    const displayRpmDemand = (this.props.demand * 100.0).toFixed(2);
    const displayRpmFeedback = (this.props.feedback * 100.0).toFixed(2);

    return (
      <tr>
        <td>Rpm demand</td>
        <td>{displayRpmDemand} %</td>
        <td>
          <form className="form-inline" onSubmit={this.changeManualRpmDemand}>
            <input
              type="number"
              min="-100"
              max="100"
              step="0.1"
              defaultValue={this.props.demand * 100.0}
              onChange={this.handleRpmChange}
              style={{ width: 80, marginLeft: 15 }}
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              required
            />
            <button className="btn btn-secondary btn-sm" type="submit">Set</button>
          </form>
        </td>
        <td>Rpm feedback</td>
        <td>{displayRpmFeedback} %</td>
      </tr>
    );
  }
}

Rpm.propTypes = {
  demand: PropTypes.number.isRequired,
  feedback: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  setThrusterDemand: PropTypes.func.isRequired,
};

export default Rpm;
