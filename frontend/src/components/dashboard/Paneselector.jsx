import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import AlphabetaHeading from './Alphabeta.heading.pane';
import HeadingPane from './Heading.pane';
import SensorPane from './Sensor.pane';
import ThrustersPane from './Thrusters.pane';
import PositionPane from './Position.pane';
import GpsSpeedPane from './GpsSpeed.pane';
import './Dashboard.css';

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
    this.handleMaxChange = this.handleMaxChange.bind(this);
    this.handleMaxChange2 = this.handleMaxChange2.bind(this);
    this.onToggleAutoAxis = this.onToggleAutoAxis.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.changePane = this.changePane.bind(this);
    this.setMinMax = this.setMinMax.bind(this);
    this.setMinMax2 = this.setMinMax2.bind(this);
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
    this.props.setMinMax(
      this.props.number,
      Number.parseFloat(this.state.min[`${this.state.pane}2`]),
      Number.parseFloat(this.state.max[`${this.state.pane}2`]),
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

  render() {
    const {
      simulationTimeSeries, modelPositionSeries, rollSeries, pitchSeries,
      speedSeries, alphabetaHeadingSeries, alphabetaRotSeries, thrusters,
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
            <option value="alphabetaHeading">αβ - heading and ROT</option>
          </select>

          {this.state.pane !== 'thrusters' &&
            <button className="btn btn-outline-secondary btn-sm" type="button" onClick={this.toggleSettings}>
              <span className="fa fa-cog" />
            </button>}
        </form>

        <div className="row">
          <div className={this.state.isSettingsOpen === true ? 'col-lg-6' : 'col-lg-12'}>
            {this.state.pane === 'heading' &&
              <HeadingPane
                min={this.props.initialSettings.min.heading}
                max={this.props.initialSettings.max.heading}
                isAutoAxis={this.state.isAutoAxis}
                simulationTimeSeries={simulationTimeSeries}
                headingSeries={modelPositionSeries.heading}
              />}

            {this.state.pane === 'rollpitch' &&
              <SensorPane
                min={this.props.initialSettings.min.rollpitch}
                max={this.props.initialSettings.max.rollpitch}
                isAutoAxis={this.state.isAutoAxis}
                simulationTimeSeries={simulationTimeSeries}
                rollSeries={rollSeries}
                pitchSeries={pitchSeries}
              />}

            {this.state.pane === 'position' &&
              <PositionPane
                min={this.props.initialSettings.min.position}
                max={this.props.initialSettings.max.position}
                min2={this.props.initialSettings.min.position2}
                max2={this.props.initialSettings.max.position2}
                isAutoAxis={this.state.isAutoAxis}
                simulationTimeSeries={simulationTimeSeries}
                latitudeSeries={modelPositionSeries.latitude}
                longitudeSeries={modelPositionSeries.longitude}
              />}

            {this.state.pane === 'gpsspeed' &&
              <GpsSpeedPane
                min={this.props.initialSettings.min.gpsspeed}
                max={this.props.initialSettings.max.gpsspeed}
                isAutoAxis={this.state.isAutoAxis}
                simulationTimeSeries={simulationTimeSeries}
                speedSeries={speedSeries}
              />}

            {this.state.pane === 'alphabetaHeading' &&
              <AlphabetaHeading
                min={this.props.initialSettings.min.alphabetaHeading}
                max={this.props.initialSettings.max.alphabetaHeading}
                min2={this.props.initialSettings.min.alphabetaHeading2}
                max2={this.props.initialSettings.max.alphabetaHeading2}
                isAutoAxis={this.state.isAutoAxis}
                simulationTimeSeries={simulationTimeSeries}
                headingSeries={alphabetaHeadingSeries}
                rotSeries={alphabetaRotSeries}
              />}
          </div>
          {this.state.isSettingsOpen &&
            <div className="col-lg-6">
              <div className="card" style={{ marginTop: 30, marginBottom: 20 }}>
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
                      <form className="form-inline" style={{ marginTop: 10 }} onSubmit={this.setMinMax}>
                        <div className="form-check">
                          Min:
                          <input
                            type="number"
                            min="-100"
                            max="200"
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
                            min="0"
                            max="400"
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
                    {/* Special case for position which has two axes. */}
                    {!this.state.isAutoAxis && (this.state.pane === 'position' || this.state.pane === 'alphabetaHeading') &&
                      <form className="form-inline" style={{ marginTop: 10 }} onSubmit={this.setMinMax2}>
                        <div className="form-check">
                          Min:
                          <input
                            type="number"
                            min="-100"
                            max="200"
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
                            min="0"
                            max="400"
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
  rollSeries: state.timeseries.sensors.roll,
  pitchSeries: state.timeseries.sensors.pitch,
  speedSeries: state.timeseries.referencesystems.speed,
  alphabetaHeadingSeries: state.timeseries.estimator.alphabeta.position.heading,
  alphabetaRotSeries: state.timeseries.estimator.alphabeta.velocity.r,
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
    min2: PropTypes.objectOf(PropTypes.number),
    max2: PropTypes.objectOf(PropTypes.number),
  }).isRequired,
  number: PropTypes.number.isRequired,
  changePane: PropTypes.func.isRequired,
  toggleAutoAxis: PropTypes.func.isRequired,
  setMinMax: PropTypes.func.isRequired,
  simulationTimeSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  modelPositionSeries: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  rollSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  pitchSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  speedSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  alphabetaHeadingSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  alphabetaRotSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  thrusters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ConnectedPaneselector;
