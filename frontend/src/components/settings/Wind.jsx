import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Settings.css';

class Wind extends Component {
  constructor() {
    super();
    this.state = { speed: 0.0, direction: 0.0 };

    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
    this.changeDirection = this.changeDirection.bind(this);
  }

  handleSpeedChange(event) { this.setState({ speed: event.target.value }); }
  handleDirectionChange(event) { this.setState({ direction: event.target.value }); }

  changeSpeed(event) {
    event.preventDefault();

    const speedParsed = Number.parseFloat(this.state.speed);
    this.props.setWindSpeed(speedParsed);
  }

  changeDirection(event) {
    event.preventDefault();

    const directionParsed = Number.parseFloat(this.state.direction);
    this.props.setWindDirection(directionParsed);
  }

  render() {
    const { speed, direction } = this.props;

    return (
      <div className="wind-settings">
        <div className="card" style={{ marginTop: 20, marginBottom: 20 }}>
          <div className="card-body">
            <h4 className="card-title">Wind settings</h4>
            <table>
              <tbody>
                <tr>
                  <td>Speed</td>
                  <td>
                    <form className="form-inline" onSubmit={this.changeSpeed}>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        step="0.1"
                        defaultValue={speed}
                        onChange={this.handleSpeedChange}
                        style={{ width: 80, marginLeft: 15 }}
                        className="form-control mb-2 mr-sm-2 mb-sm-0"
                        required
                      />
                      <button className="btn btn-secondary btn-sm" type="submit">Set</button>
                    </form>
                  </td>
                </tr>
                <tr>
                  <td>Direction</td>
                  <td>
                    <form className="form-inline" onSubmit={this.changeDirection}>
                      <input
                        type="number"
                        min="0"
                        max="360"
                        step="0.1"
                        defaultValue={direction}
                        onChange={this.handleDirectionChange}
                        style={{ width: 80, marginLeft: 15 }}
                        className="form-control mb-2 mr-sm-2 mb-sm-0"
                        required
                      />
                      <button className="btn btn-secondary btn-sm" type="submit">Set</button>
                    </form>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

Wind.propTypes = {
  speed: PropTypes.number.isRequired,
  direction: PropTypes.number.isRequired,
  setWindSpeed: PropTypes.func.isRequired,
  setWindDirection: PropTypes.func.isRequired,
};

export default Wind;
