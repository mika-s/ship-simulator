import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Control.css';

class Autopilot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: props.initialHeading,
    };

    this.handleHeadingChange = this.handleHeadingChange.bind(this);
    this.setAutopilotHeading = this.setAutopilotHeading.bind(this);
  }

  setAutopilotHeading(event) {
    event.preventDefault();
    this.props.setAutopilotHeading(this.state.heading);
  }

  handleHeadingChange(event) {
    const parsedHeading = Number.parseFloat(event.target.value);

    this.setState({
      heading: parsedHeading,
    });
  }

  render() {
    return (
      <div className="autopilot">

        <div className="col-lg-6">
          <div className="card" style={{ marginTop: 20, marginBottom: 20 }}>
            <div className="card-body">
              <h4 className="card-title">Settings</h4>
              <h6 className="card-subtitle mb-2 text-muted">Heading</h6>

              <form className="form-inline" onSubmit={this.setAutopilotHeading}>
                <table>
                  <tbody>
                    <tr>
                      <td>Set heading</td>
                      <td>
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
                      </td>
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

      </div>
    );
  }
}

Autopilot.propTypes = {
  initialHeading: PropTypes.number.isRequired,
  setAutopilotHeading: PropTypes.func.isRequired,
};

export default Autopilot;
