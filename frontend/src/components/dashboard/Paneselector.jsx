import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
      isSettingsOpen: false,
    };

    this.onToggleAutoAxis = this.onToggleAutoAxis.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.changePane = this.changePane.bind(this);
  }

  onToggleAutoAxis() {
    this.setState({ isAutoAxis: !this.state.isAutoAxis });
    this.props.toggleAutoAxis(this.props.number);
  }

  toggleSettings() {
    this.setState({ isSettingsOpen: !this.state.isSettingsOpen });
  }

  changePane(event) {
    const newPane = event.target.value;
    this.setState({ pane: newPane });
    this.props.changePane(event, this.props.number);
  }

  render() {
    const {
      simulationTimeSeries, modelPositionSeries, rollSeries, pitchSeries,
      speedSeries, thrusters,
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
                simulationTimeSeries={simulationTimeSeries}
                headingSeries={modelPositionSeries.heading}
              />}

            {this.state.pane === 'rollpitch' &&
              <SensorPane
                simulationTimeSeries={simulationTimeSeries}
                rollSeries={rollSeries}
                pitchSeries={pitchSeries}
              />}

            {this.state.pane === 'position' &&
              <PositionPane
                simulationTimeSeries={simulationTimeSeries}
                latitudeSeries={modelPositionSeries.latitude}
                longitudeSeries={modelPositionSeries.longitude}
              />}

            {this.state.pane === 'gpsspeed' &&
              <GpsSpeedPane
                isAutoAxis={this.state.isAutoAxis}
                simulationTimeSeries={simulationTimeSeries}
                speedSeries={speedSeries}
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
  thrusters: state.ship.thrusters,
});

const mapDispatchToProps = () => ({});

const ConnectedPaneselector = connect(mapStateToProps, mapDispatchToProps)(Paneselector);

Paneselector.propTypes = {
  initialPane: PropTypes.string.isRequired,
  initialSettings: PropTypes.shape({
    isAutoAxis: PropTypes.bool.isRequired,
  }).isRequired,
  number: PropTypes.number.isRequired,
  changePane: PropTypes.func.isRequired,
  toggleAutoAxis: PropTypes.func.isRequired,
  simulationTimeSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  modelPositionSeries: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  rollSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  pitchSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  speedSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  thrusters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ConnectedPaneselector;
