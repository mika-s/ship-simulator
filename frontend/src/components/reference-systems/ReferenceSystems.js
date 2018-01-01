import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GPS from '../gps/GPS';
import './ReferenceSystems.css';

class ReferenceSystems extends Component {
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

const mapStateToProps = state => ({
  gpses: state.ship.referencesystems.gpses,
});

const mapDispatchToProps = () => ({});

const ConnectedReferenceSystems = connect(mapStateToProps, mapDispatchToProps)(ReferenceSystems);

ReferenceSystems.propTypes = {
  gpses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ConnectedReferenceSystems;
