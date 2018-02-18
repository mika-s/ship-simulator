import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import SensorPane from './Sensor.pane';
import ThrustersPane from './Thrusters.pane';
import OneGraphPane from './1Graph.pane';
import TwoGraphPane from './2Graph.pane';
import ThreeGraphPane from './3Graph.pane';
import FourGraphPane from './4Graph.pane';
import './Dashboard.css';

/**
 * Class representing a pane selector that contains several panes.
 * The panes can be chosen with a dropdown menu.
 * This is a hybrid of a smart component, communicating with the
 * Redux store, and a ordinary component receiving data as props.
 * @extends Component
*/
class Paneselector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pane: props.initialPane,
      isAutoAxis: props.initialSettings.isAutoAxis,
      min: props.initialSettings.min,
      max: props.initialSettings.max,
      isSettingsOpen: false,
    };

    this.handleMinChange = this.handleMinChange.bind(this);
    this.handleMinChange2 = this.handleMinChange2.bind(this);
    this.handleMinChange3 = this.handleMinChange3.bind(this);
    this.handleMinChange4 = this.handleMinChange4.bind(this);
    this.handleMaxChange = this.handleMaxChange.bind(this);
    this.handleMaxChange2 = this.handleMaxChange2.bind(this);
    this.handleMaxChange3 = this.handleMaxChange3.bind(this);
    this.handleMaxChange4 = this.handleMaxChange4.bind(this);
    this.onToggleAutoAxis = this.onToggleAutoAxis.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.changePane = this.changePane.bind(this);
    this.setMinMax = this.setMinMax.bind(this);
    this.setMinMax2 = this.setMinMax2.bind(this);
    this.setMinMax3 = this.setMinMax3.bind(this);
    this.setMinMax4 = this.setMinMax4.bind(this);
  }

  onToggleAutoAxis() {
    this.setState({ isAutoAxis: !this.state.isAutoAxis });
    this.props.toggleAutoAxis(this.props.number);
  }

  setMinMax(event) {
    event.preventDefault();
    this.props.setMinMax(
      this.props.number,
      Number.parseFloat(this.state.min[this.state.pane]),
      Number.parseFloat(this.state.max[this.state.pane]),
    );
  }

  setMinMax2(event) {
    event.preventDefault();
    this.props.setMinMax2(
      this.props.number,
      Number.parseFloat(this.state.min[`${this.state.pane}2`]),
      Number.parseFloat(this.state.max[`${this.state.pane}2`]),
    );
  }

  setMinMax3(event) {
    event.preventDefault();
    this.props.setMinMax3(
      this.props.number,
      Number.parseFloat(this.state.min[`${this.state.pane}3`]),
      Number.parseFloat(this.state.max[`${this.state.pane}3`]),
    );
  }

  setMinMax4(event) {
    event.preventDefault();
    this.props.setMinMax4(
      this.props.number,
      Number.parseFloat(this.state.min[`${this.state.pane}4`]),
      Number.parseFloat(this.state.max[`${this.state.pane}4`]),
    );
  }

  changePane(event) {
    const newPane = event.target.value;
    this.setState({ pane: newPane });
    this.props.changePane(event, this.props.number);
  }

  toggleSettings() {
    this.setState({ isSettingsOpen: !this.state.isSettingsOpen });
  }

  handleMinChange(event) {
    this.setState({
      min: update(this.state.min, {
        [this.state.pane]: { $set: event.target.value },
      }),
    });
  }

  handleMinChange2(event) {
    this.setState({
      min: update(this.state.min, {
        [`${this.state.pane}2`]: { $set: event.target.value },
      }),
    });
  }

  handleMinChange3(event) {
    this.setState({
      min: update(this.state.min, {
        [`${this.state.pane}3`]: { $set: event.target.value },
      }),
    });
  }

  handleMinChange4(event) {
    this.setState({
      min: update(this.state.min, {
        [`${this.state.pane}4`]: { $set: event.target.value },
      }),
    });
  }

  handleMaxChange(event) {
    this.setState({
      max: update(this.state.max, {
        [this.state.pane]: { $set: event.target.value },
      }),
    });
  }

  handleMaxChange2(event) {
    this.setState({
      max: update(this.state.max, {
        [`${this.state.pane}2`]: { $set: event.target.value },
      }),
    });
  }

  handleMaxChange3(event) {
    this.setState({
      max: update(this.state.max, {
        [`${this.state.pane}3`]: { $set: event.target.value },
      }),
    });
  }

  handleMaxChange4(event) {
    this.setState({
      max: update(this.state.max, {
        [`${this.state.pane}4`]: { $set: event.target.value },
      }),
    });
  }

  render() {
    const {
      simulationTimeSeries, modelPositionSeries, sensorsSeries,
      speedSeries, alphabetaHeadingSeries, alphabetaRotSeries, thrusters,
      headingPSeries, headingISeries, headingDSeries, headingTotalSeries,
      speedPSeries, speedISeries, speedDSeries, speedTotalSeries,
    } = this.props;

    return (
      <div>
        <form className="form-inline">
          <select
            className="form-control mb-2 mr-sm-2 mb-sm-0"
            defaultValue={this.props.initialPane}
            onChange={this.changePane}
          >
            <option value="heading">Heading</option>
            <option value="position">Position</option>
            <option value="rollpitch">Roll and pitch</option>
            <option value="thrusters">Thrusters</option>
            <option value="gpsspeed">GPS speed</option>
            <option value="alphabetaHeading">αβ - Heading and ROT</option>
            <option value="autopilotHeadingPid">Autopilot - Heading PID</option>
            <option value="autopilotSpeedPid">Autopilot - Speed PID</option>
          </select>

          {this.state.pane !== 'thrusters' &&
            <button className="btn btn-outline-secondary btn-sm" type="button" onClick={this.toggleSettings}>
              <span className="fa fa-cog" />
            </button>}
        </form>

        <div className="row">
          <div className={this.state.isSettingsOpen === true ? 'col-lg-6' : 'col-lg-12'}>
            {this.state.pane === 'heading' &&
              <ThreeGraphPane
                min={this.props.initialSettings.min.heading}
                max={this.props.initialSettings.max.heading}
                min2={this.props.initialSettings.min.heading2}
                max2={this.props.initialSettings.max.heading2}
                min3={this.props.initialSettings.min.heading3}
                max3={this.props.initialSettings.max.heading3}
                firstLabel="Model heading"
                secondLabel="Gyro heading"
                thirdLabel="Filtered gyro heading"
                color1={{ r: 255, g: 0, b: 0 }}
                color2={{ r: 0, g: 255, b: 0 }}
                color3={{ r: 0, g: 0, b: 255 }}
                isAutoAxis={this.state.isAutoAxis}
                timeSeries={simulationTimeSeries}
                firstSeries={modelPositionSeries.heading}
                secondSeries={sensorsSeries.gyroHeading}
                thirdSeries={sensorsSeries.filteredGyroHeading}
              />}

            {this.state.pane === 'rollpitch' &&
              <SensorPane
                min={this.props.initialSettings.min.rollpitch}
                max={this.props.initialSettings.max.rollpitch}
                isAutoAxis={this.state.isAutoAxis}
                timeSeries={simulationTimeSeries}
                rollSeries={sensorsSeries.roll}
                pitchSeries={sensorsSeries.pitch}
              />}

            {this.state.pane === 'position' &&
              <TwoGraphPane
                min={this.props.initialSettings.min.position}
                max={this.props.initialSettings.max.position}
                min2={this.props.initialSettings.min.position2}
                max2={this.props.initialSettings.max.position2}
                firstLabel="Latitude"
                secondLabel="Longitude"
                color1={{ r: 0, g: 0, b: 0 }}
                color2={{ r: 0, g: 255, b: 0 }}
                isAutoAxis={this.state.isAutoAxis}
                timeSeries={simulationTimeSeries}
                firstSeries={modelPositionSeries.latitude}
                secondSeries={modelPositionSeries.longitude}
              />}

            {this.state.pane === 'gpsspeed' &&
              <OneGraphPane
                min={this.props.initialSettings.min.gpsspeed}
                max={this.props.initialSettings.max.gpsspeed}
                firstLabel="GPS speed"
                color1={{ r: 0, g: 0, b: 255 }}
                isAutoAxis={this.state.isAutoAxis}
                timeSeries={simulationTimeSeries}
                firstSeries={speedSeries}
              />}

            {this.state.pane === 'alphabetaHeading' &&
              <TwoGraphPane
                min={this.props.initialSettings.min.alphabetaHeading}
                max={this.props.initialSettings.max.alphabetaHeading}
                min2={this.props.initialSettings.min.alphabetaHeading2}
                max2={this.props.initialSettings.max.alphabetaHeading2}
                firstLabel="Heading"
                secondLabel="ROT"
                color1={{ r: 244, g: 229, b: 66 }}
                color2={{ r: 63, g: 44, b: 22 }}
                isAutoAxis={this.state.isAutoAxis}
                timeSeries={simulationTimeSeries}
                firstSeries={alphabetaHeadingSeries}
                secondSeries={alphabetaRotSeries}
              />}

            {this.state.pane === 'autopilotHeadingPid' &&
              <FourGraphPane
                min={this.props.initialSettings.min.autopilotHeadingPid}
                max={this.props.initialSettings.max.autopilotHeadingPid}
                min2={this.props.initialSettings.min.autopilotHeadingPid2}
                max2={this.props.initialSettings.max.autopilotHeadingPid2}
                min3={this.props.initialSettings.min.autopilotHeadingPid3}
                max3={this.props.initialSettings.max.autopilotHeadingPid3}
                min4={this.props.initialSettings.min.autopilotHeadingPid4}
                max4={this.props.initialSettings.max.autopilotHeadingPid4}
                firstLabel="P"
                secondLabel="I"
                thirdLabel="D"
                fourthLabel="Total"
                color1={{ r: 69, g: 32, b: 117 }}
                color2={{ r: 32, g: 117, b: 85 }}
                color3={{ r: 255, g: 117, b: 85 }}
                color4={{ r: 255, g: 0, b: 85 }}
                isAutoAxis={this.state.isAutoAxis}
                timeSeries={simulationTimeSeries}
                firstSeries={headingPSeries}
                secondSeries={headingISeries}
                thirdSeries={headingDSeries}
                fourthSeries={headingTotalSeries}
              />}

            {this.state.pane === 'autopilotSpeedPid' &&
              <FourGraphPane
                min={this.props.initialSettings.min.autopilotSpeedPid}
                max={this.props.initialSettings.max.autopilotSpeedPid}
                min2={this.props.initialSettings.min.autopilotSpeedPid2}
                max2={this.props.initialSettings.max.autopilotSpeedPid2}
                min3={this.props.initialSettings.min.autopilotSpeedPid3}
                max3={this.props.initialSettings.max.autopilotSpeedPid3}
                min4={this.props.initialSettings.min.autopilotSpeedPid4}
                max4={this.props.initialSettings.max.autopilotSpeedPid4}
                firstLabel="P"
                secondLabel="I"
                thirdLabel="D"
                fourthLabel="Total"
                color1={{ r: 69, g: 32, b: 117 }}
                color2={{ r: 32, g: 117, b: 85 }}
                color3={{ r: 255, g: 117, b: 85 }}
                color4={{ r: 255, g: 0, b: 85 }}
                isAutoAxis={this.state.isAutoAxis}
                timeSeries={simulationTimeSeries}
                firstSeries={speedPSeries}
                secondSeries={speedISeries}
                thirdSeries={speedDSeries}
                fourthSeries={speedTotalSeries}
              />}
          </div>
          {this.state.isSettingsOpen &&
            <div className="col-lg-6">
              <div className="card" style={{ marginTop: 15, marginBottom: 10 }}>
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Graph settings</h6>
                  <div className="card-text">
                    <form className="form-inline">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="autoCheckbox"
                          checked={this.state.isAutoAxis}
                          onChange={this.onToggleAutoAxis}
                        />
                        <label className="form-check-label" htmlFor="autoCheckbox">Auto axis</label>
                      </div>
                    </form>
                    {!this.state.isAutoAxis &&
                      <form className="form-inline min-max-form" onSubmit={this.setMinMax}>
                        <div className="form-check">
                          Min:
                          <input
                            type="number"
                            min="-2000"
                            max="2000"
                            step="0.1"
                            value={this.state.min[this.state.pane]}
                            onChange={this.handleMinChange}
                            style={{ width: 80, marginLeft: 5 }}
                            className="form-control mb-2 mr-sm-2 mb-sm-0"
                            required
                          />
                          Max:
                          <input
                            type="number"
                            min="-2000"
                            max="2000"
                            step="0.1"
                            value={this.state.max[this.state.pane]}
                            onChange={this.handleMaxChange}
                            style={{ width: 80, marginLeft: 5 }}
                            className="form-control mb-2 mr-sm-2 mb-sm-0"
                            required
                          />
                          <button className="btn btn-secondary btn-sm" type="submit">Set</button>
                        </div>
                      </form>}
                    {/* Special case for position which has two or more axes. */}
                    {!this.state.isAutoAxis &&
                    (this.state.pane === 'position' ||
                    this.state.pane === 'heading' ||
                    this.state.pane === 'alphabetaHeading' ||
                    this.state.pane === 'autopilotHeadingPid' ||
                    this.state.pane === 'autopilotSpeedPid') &&
                      <form className="form-inline min-max-form" onSubmit={this.setMinMax2}>
                        <div className="form-check">
                          Min:
                          <input
                            type="number"
                            min="-2000"
                            max="2000"
                            step="0.1"
                            value={this.state.min[`${this.state.pane}2`]}
                            onChange={this.handleMinChange2}
                            style={{ width: 80, marginLeft: 5 }}
                            className="form-control mb-2 mr-sm-2 mb-sm-0"
                            required
                          />
                          Max:
                          <input
                            type="number"
                            min="-2000"
                            max="2000"
                            step="0.1"
                            value={this.state.max[`${this.state.pane}2`]}
                            onChange={this.handleMaxChange2}
                            style={{ width: 80, marginLeft: 5 }}
                            className="form-control mb-2 mr-sm-2 mb-sm-0"
                            required
                          />
                          <button className="btn btn-secondary btn-sm" type="submit">Set</button>
                        </div>
                      </form>}
                    {/* Special case for position which has three or more axes. */}
                    {!this.state.isAutoAxis &&
                    (this.state.pane === 'heading' ||
                    this.state.pane === 'autopilotHeadingPid' ||
                    this.state.pane === 'autopilotSpeedPid') &&
                      <form className="form-inline min-max-form" onSubmit={this.setMinMax3}>
                        <div className="form-check">
                          Min:
                          <input
                            type="number"
                            min="-2000"
                            max="2000"
                            step="0.1"
                            value={this.state.min[`${this.state.pane}3`]}
                            onChange={this.handleMinChange3}
                            style={{ width: 80, marginLeft: 5 }}
                            className="form-control mb-2 mr-sm-2 mb-sm-0"
                            required
                          />
                          Max:
                          <input
                            type="number"
                            min="-2000"
                            max="2000"
                            step="0.1"
                            value={this.state.max[`${this.state.pane}3`]}
                            onChange={this.handleMaxChange3}
                            style={{ width: 80, marginLeft: 5 }}
                            className="form-control mb-2 mr-sm-2 mb-sm-0"
                            required
                          />
                          <button className="btn btn-secondary btn-sm" type="submit">Set</button>
                        </div>
                      </form>}
                    {/* Special case for position which has four axes. */}
                    {!this.state.isAutoAxis &&
                    (this.state.pane === 'autopilotHeadingPid' ||
                    this.state.pane === 'autopilotSpeedPid') &&
                      <form className="form-inline min-max-form" onSubmit={this.setMinMax4}>
                        <div className="form-check">
                          Min:
                          <input
                            type="number"
                            min="-2000"
                            max="2000"
                            step="0.1"
                            value={this.state.min[`${this.state.pane}4`]}
                            onChange={this.handleMinChange4}
                            style={{ width: 80, marginLeft: 5 }}
                            className="form-control mb-2 mr-sm-2 mb-sm-0"
                            required
                          />
                          Max:
                          <input
                            type="number"
                            min="-2000"
                            max="2000"
                            step="0.1"
                            value={this.state.max[`${this.state.pane}4`]}
                            onChange={this.handleMaxChange4}
                            style={{ width: 80, marginLeft: 5 }}
                            className="form-control mb-2 mr-sm-2 mb-sm-0"
                            required
                          />
                          <button className="btn btn-secondary btn-sm" type="submit">Set</button>
                        </div>
                      </form>}
                  </div>
                </div>
              </div>
            </div>}
        </div>

        {this.state.pane === 'thrusters' &&
          <ThrustersPane thrusters={thrusters} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  simulationTimeSeries: state.timeseries.time,
  modelPositionSeries: state.timeseries.model.position,
  sensorsSeries: state.timeseries.sensors,
  speedSeries: state.timeseries.referencesystems.speed,
  alphabetaHeadingSeries: state.timeseries.estimator.alphabeta.position.heading,
  alphabetaRotSeries: state.timeseries.estimator.alphabeta.velocity.r,
  headingPSeries: state.timeseries.autopilot.controllers.headingPid.p,
  headingISeries: state.timeseries.autopilot.controllers.headingPid.i,
  headingDSeries: state.timeseries.autopilot.controllers.headingPid.d,
  headingTotalSeries: state.timeseries.autopilot.controllers.headingPid.total,
  speedPSeries: state.timeseries.autopilot.controllers.speedPid.p,
  speedISeries: state.timeseries.autopilot.controllers.speedPid.i,
  speedDSeries: state.timeseries.autopilot.controllers.speedPid.d,
  speedTotalSeries: state.timeseries.autopilot.controllers.speedPid.total,
  thrusters: state.ship.thrusters,
});

const mapDispatchToProps = () => ({});

const ConnectedPaneselector = connect(mapStateToProps, mapDispatchToProps)(Paneselector);

Paneselector.propTypes = {
  initialPane: PropTypes.string.isRequired,
  initialSettings: PropTypes.shape({
    isAutoAxis: PropTypes.bool.isRequired,
    min: PropTypes.objectOf(PropTypes.number).isRequired,
    max: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
  number: PropTypes.number.isRequired,
  changePane: PropTypes.func.isRequired,
  toggleAutoAxis: PropTypes.func.isRequired,
  setMinMax: PropTypes.func.isRequired,
  setMinMax2: PropTypes.func.isRequired,
  setMinMax3: PropTypes.func.isRequired,
  setMinMax4: PropTypes.func.isRequired,
  simulationTimeSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  modelPositionSeries: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  sensorsSeries: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  speedSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  alphabetaHeadingSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  alphabetaRotSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  headingPSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  headingISeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  headingDSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  headingTotalSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  speedPSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  speedISeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  speedDSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  speedTotalSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  thrusters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ConnectedPaneselector;
