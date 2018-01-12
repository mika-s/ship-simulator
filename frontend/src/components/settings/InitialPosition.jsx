import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Settings.css';

class InitialPosition extends Component {
  constructor() {
    super();
    this.state = { latitude: 0.0, longitude: 0.0, heading: 0.0 };

    this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
    this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
    this.handleHeadingChange = this.handleHeadingChange.bind(this);
    this.changePosition = this.changePosition.bind(this);
  }

  componentWillMount() {
    const { latitude, longitude, heading } = this.props.position;
    this.setState({ latitude, longitude, heading });
  }

  handleLatitudeChange(event) { this.setState({ latitude: event.target.value }); }
  handleLongitudeChange(event) { this.setState({ longitude: event.target.value }); }
  handleHeadingChange(event) { this.setState({ heading: event.target.value }); }

  changePosition(event) {
    event.preventDefault();

    const latitude = Number.parseFloat(this.state.latitude);
    const longitude = Number.parseFloat(this.state.longitude);
    const heading = Number.parseFloat(this.state.heading);

    this.props.setPosition({ latitude, longitude, heading });
  }

  render() {
    const { latitude, longitude, heading } = this.props.position;

    return (
      <div className="heading-settings">
        <div className="card" style={{ marginTop: 20, marginBottom: 20 }}>
          <div className="card-body">
            <h4 className="card-title">Initial position and heading</h4>
            <form className="form-inline" onSubmit={this.changePosition}>
              <table>
                <tbody>
                  <tr>
                    <td>Latitude</td>
                    <td>
                      <input
                        type="number"
                        min="-90"
                        max="90"
                        step="0.1"
                        defaultValue={latitude}
                        onChange={this.handleLatitudeChange}
                        style={{ width: 80, marginLeft: 15 }}
                        className="form-control mb-2 mr-sm-2 mb-sm-0"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Longitude</td>
                    <td>
                      <input
                        type="number"
                        min="-180"
                        max="180"
                        step="0.1"
                        defaultValue={longitude}
                        onChange={this.handleLongitudeChange}
                        style={{ width: 80, marginLeft: 15 }}
                        className="form-control mb-2 mr-sm-2 mb-sm-0"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Heading</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="360"
                        step="0.1"
                        defaultValue={heading}
                        onChange={this.handleHeadingChange}
                        style={{ width: 80, marginLeft: 15 }}
                        className="form-control mb-2 mr-sm-2 mb-sm-0"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <button className="btn btn-secondary btn-sm" type="submit">Set</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

InitialPosition.propTypes = {
  position: PropTypes.objectOf(PropTypes.number).isRequired,
  setPosition: PropTypes.func.isRequired,
};

export default InitialPosition;
