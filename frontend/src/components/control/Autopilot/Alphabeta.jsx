import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Control.css';

class Alphabeta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alpha: props.initialAlpha,
      beta: props.initialBeta,
    };

    this.handleAlphaChange = this.handleAlphaChange.bind(this);
    this.handleBetaChange = this.handleBetaChange.bind(this);
    this.setAlphaForHeading = this.setAlphaForHeading.bind(this);
    this.setBetaForHeading = this.setBetaForHeading.bind(this);
  }

  setAlphaForHeading(event) {
    event.preventDefault();
    this.props.setAlphaForHeading(Number.parseFloat(this.state.alpha));
  }

  setBetaForHeading(event) {
    event.preventDefault();
    this.props.setBetaForHeading(Number.parseFloat(this.state.beta));
  }

  handleAlphaChange(event) { this.setState({ alpha: event.target.value }); }
  handleBetaChange(event) { this.setState({ beta: event.target.value }); }

  render() {
    return (
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
    );
  }
}

Alphabeta.propTypes = {
  initialAlpha: PropTypes.number.isRequired,
  initialBeta: PropTypes.number.isRequired,
  setAlphaForHeading: PropTypes.func.isRequired,
  setBetaForHeading: PropTypes.func.isRequired,
};

export default Alphabeta;
