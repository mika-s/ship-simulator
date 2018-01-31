import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Control.css';

class Pid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      p: props.initialP,
      i: props.initialI,
      d: props.initialD,
    };

    this.handlePChange = this.handlePChange.bind(this);
    this.handleIChange = this.handleIChange.bind(this);
    this.handleDChange = this.handleDChange.bind(this);
    this.setP = this.setP.bind(this);
    this.setI = this.setI.bind(this);
    this.setD = this.setD.bind(this);
  }

  setP(event) {
    event.preventDefault();
    this.props.setP(this.state.p);
  }

  setI(event) {
    event.preventDefault();
    this.props.setI(this.state.i);
  }

  setD(event) {
    event.preventDefault();
    this.props.setD(this.state.d);
  }

  handlePChange(event) {
    const parsedP = Number.parseFloat(event.target.value);
    this.setState({ p: parsedP });
  }

  handleIChange(event) {
    const parsedI = Number.parseFloat(event.target.value);
    this.setState({ i: parsedI });
  }

  handleDChange(event) {
    const parsedD = Number.parseFloat(event.target.value);
    this.setState({ d: parsedD });
  }

  render() {
    const { name } = this.props;

    return (
      <div className="card" style={{ marginTop: 5, marginBottom: 20 }}>
        <div className="card-body">
          <h4 className="card-title">{name} PID</h4>

          <h6 className="card-subtitle mb-2 text-muted">P</h6>
          <form className="form-inline" onSubmit={this.setP}>
            <input
              type="number"
              min="0"
              max="2"
              step="0.001"
              value={this.state.p}
              onChange={this.handlePChange}
              style={{ width: 80, marginLeft: 15 }}
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              required
            />
            <button className="btn btn-secondary btn-sm" type="submit">Set</button>
          </form>

          <h6 className="card-subtitle mb-2 text-muted" style={{ marginTop: 20 }}>I</h6>
          <form className="form-inline" onSubmit={this.setI}>
            <input
              type="number"
              min="0"
              max="2"
              step="0.001"
              value={this.state.i}
              onChange={this.handleIChange}
              style={{ width: 80, marginLeft: 15 }}
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              required
            />
            <button className="btn btn-secondary btn-sm" type="submit">Set</button>
          </form>

          <h6 className="card-subtitle mb-2 text-muted" style={{ marginTop: 20 }}>D</h6>
          <form className="form-inline" onSubmit={this.setD}>
            <input
              type="number"
              min="0"
              max="2"
              step="0.001"
              value={this.state.d}
              onChange={this.handleDChange}
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

Pid.propTypes = {
  name: PropTypes.string.isRequired,
  initialP: PropTypes.number.isRequired,
  initialI: PropTypes.number.isRequired,
  initialD: PropTypes.number.isRequired,
  setP: PropTypes.func.isRequired,
  setI: PropTypes.func.isRequired,
  setD: PropTypes.func.isRequired,
};

export default Pid;
