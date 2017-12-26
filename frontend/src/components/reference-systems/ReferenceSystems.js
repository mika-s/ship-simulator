import * as PubSub from 'pubsub-js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GPS from '../gps/GPS';
import './ReferenceSystems.css';

class Sensors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gpses: props.gpses,
    };
  }

  componentDidMount() {
    const gpsesSubscriber = (msg, data) => { this.setState({ gpses: data }); };

    this.gpsesToken = PubSub.subscribe('gpses', gpsesSubscriber);
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.gpsesToken);
  }

  render() {
    const gpsElements = [];
    for (let i = 0; i < this.state.gpses.length; i += 1) {
      gpsElements.push(<GPS
        key={i.toString()}
        gpsData={this.state.gpses[i]}
      />);
    }
    return (
      <div className="reference-systems">
        <h2>Reference systems</h2>

        <div className="card" style={{ marginTop: 20, marginBottom: 20 }}>
          <div className="card-body">
            <h4 className="card-title">GPSes</h4>
            <table className="table table-condensed">
              <tbody>
                <tr>
                  <td>#</td>
                  <td>Latitude</td>
                  <td>Longitude</td>
                </tr>
                {gpsElements}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

Sensors.propTypes = {
  gpses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sensors;
