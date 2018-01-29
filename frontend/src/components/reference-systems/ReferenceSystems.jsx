import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GPS from './GPS';
import './ReferenceSystems.css';

export class UnconnectedReferenceSystems extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const gpsElements = this.props.gpses.map(gps => <GPS key={gps.number} gpsData={gps} />);

    return (
      <div className="reference-systems">
        <h2>Reference systems</h2>

        <div className="card" style={{ marginTop: 20, marginBottom: 20 }}>
          <div className="card-body">
            <h4 className="card-title">GPSes</h4>
            <table className="table table-condensed">
              <tbody>
                <tr>
                  <td style={{ width: '10%' }}>#</td>
                  <td style={{ width: '20%' }}>Latitude</td>
                  <td style={{ width: '20%' }}>Longitude</td>
                  <td style={{ width: '20%' }}>Speed</td>
                  <td style={{ width: '20%' }}>Direction</td>
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

UnconnectedReferenceSystems.propTypes = {
  gpses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  gpses: state.ship.referencesystems.gpses,
});

const mapDispatchToProps = () => ({});

const ReferenceSystems = connect(mapStateToProps, mapDispatchToProps)(UnconnectedReferenceSystems);

export default ReferenceSystems;
