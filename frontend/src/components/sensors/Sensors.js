import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GyroCompass from '../gyrocompass/GyroCompass';
import MruSensor from '../mrusensor/MruSensor';
import WindSensor from '../windsensor/WindSensor';
import './Sensors.css';

class Sensors extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const windSensorElements = [];
    for (let i = 0; i < this.props.windsensors.length; i += 1) {
      windSensorElements.push(<WindSensor
        key={i.toString()}
        windSensorData={this.props.windsensors[i]}
      />);
    }

    const gyroCompassElements = [];
    for (let i = 0; i < this.props.gyrocompasses.length; i += 1) {
      gyroCompassElements.push(<GyroCompass
        key={i.toString()}
        gyroCompassData={this.props.gyrocompasses[i]}
      />);
    }

    const mruSensorElements = [];
    for (let i = 0; i < this.props.mrus.length; i += 1) {
      mruSensorElements.push(<MruSensor
        key={i.toString()}
        mruSensorData={this.props.mrus[i]}
      />);
    }

    return (
      <div className="sensors">
        <h2>Sensors</h2>

        <div className="card" style={{ marginTop: 20, marginBottom: 20 }}>
          <div className="card-body">
            <h4 className="card-title">Wind sensors</h4>
            <table className="table table-condensed">
              <tbody>
                <tr>
                  <td>#</td>
                  <td>Speed</td>
                  <td>Direction</td>
                </tr>
                {windSensorElements}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ marginTop: 20, marginBottom: 20 }}>
          <div className="card-body">
            <h4 className="card-title">Gyro compasses</h4>
            <table className="table table-condensed">
              <tbody>
                <tr>
                  <td>#</td>
                  <td>Heading</td>
                </tr>
                {gyroCompassElements}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ marginTop: 20, marginBottom: 20 }}>
          <div className="card-body">
            <h4 className="card-title">MRUs</h4>
            <table className="table table-condensed">
              <tbody>
                <tr>
                  <td>#</td>
                  <td>Roll</td>
                  <td>Pitch</td>
                </tr>
                {mruSensorElements}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  windsensors: state.ship.sensors.windsensors,
  gyrocompasses: state.ship.sensors.gyrocompasses,
  mrus: state.ship.sensors.mrus,
});

const mapDispatchToProps = () => ({});

const ConnectedSensors = connect(mapStateToProps, mapDispatchToProps)(Sensors);

Sensors.propTypes = {
  windsensors: PropTypes.arrayOf(PropTypes.object).isRequired,
  gyrocompasses: PropTypes.arrayOf(PropTypes.object).isRequired,
  mrus: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ConnectedSensors;
