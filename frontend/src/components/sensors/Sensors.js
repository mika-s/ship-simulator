import * as PubSub from 'pubsub-js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GyroCompass from '../gyrocompass/GyroCompass';
import MruSensor from '../mrusensor/MruSensor';
import WindSensor from '../windsensor/WindSensor';
import './Sensors.css';

class Sensors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windSensors: props.windSensors,
      gyroCompasses: props.gyroCompasses,
      mruSensors: props.mruSensors,
    };
  }

  componentDidMount() {
    const windSensorsSubscriber = (msg, data) => { this.setState({ windSensors: data }); };
    const gyroCompassesSubscriber = (msg, data) => { this.setState({ gyroCompasses: data }); };
    const mruSensorsSubscriber = (msg, data) => { this.setState({ mruSensors: data }); };

    this.windSensorsToken = PubSub.subscribe('windSensors', windSensorsSubscriber);
    this.gyroCompassesToken = PubSub.subscribe('gyroCompasses', gyroCompassesSubscriber);
    this.mruSensorsToken = PubSub.subscribe('mruSensors', mruSensorsSubscriber);
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.windSensorsToken);
    PubSub.unsubscribe(this.gyroCompassesToken);
    PubSub.unsubscribe(this.mruSensorsToken);
  }

  render() {
    const windSensorElements = [];
    for (let i = 0; i < this.state.windSensors.length; i += 1) {
      windSensorElements.push(<WindSensor
        key={i.toString()}
        windSensorData={this.state.windSensors[i]}
      />);
    }

    const gyroCompassElements = [];
    for (let i = 0; i < this.state.gyroCompasses.length; i += 1) {
      gyroCompassElements.push(<GyroCompass
        key={i.toString()}
        gyroCompassData={this.state.gyroCompasses[i]}
      />);
    }

    const mruSensorElements = [];
    for (let i = 0; i < this.state.mruSensors.length; i += 1) {
      mruSensorElements.push(<MruSensor
        key={i.toString()}
        mruSensorData={this.state.mruSensors[i]}
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

Sensors.propTypes = {
  windSensors: PropTypes.arrayOf(PropTypes.object).isRequired,
  gyroCompasses: PropTypes.arrayOf(PropTypes.object).isRequired,
  mruSensors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sensors;
