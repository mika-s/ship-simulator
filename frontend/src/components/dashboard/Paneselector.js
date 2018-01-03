import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeadingPane from './Heading.pane';
import SensorPane from './Sensor.pane';
import './Dashboard.css';

class Paneselector extends Component {
  constructor(props) {
    super(props);
    this.state = { pane: props.initialPane };

    this.changePane = this.changePane.bind(this);
  }

  changePane(event) {
    const newPane = event.target.value;
    this.setState({ pane: newPane });
    this.props.changePane(event, this.props.number);
  }

  render() {
    const {
      simulationTimeSeries, modelPositionSeries, rollSeries, pitchSeries,
    } = this.props;

    return (
      <div>
        <form className="form-inline">
          <select className="form-control mb-2 mr-sm-2 mb-sm-0" defaultValue={this.props.initialPane} onChange={this.changePane}>
            <option value="heading">Heading</option>
            <option value="position">Position</option>
            <option value="rollpitch">Roll and pitch</option>
            <option value="thrusters">Thrusters</option>
          </select>
        </form>

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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  simulationTimeSeries: state.timeseries.time,
  modelPositionSeries: state.timeseries.model.position,
  rollSeries: state.timeseries.sensors.roll,
  pitchSeries: state.timeseries.sensors.pitch,
});

const mapDispatchToProps = () => ({});

const ConnectedPaneselector = connect(mapStateToProps, mapDispatchToProps)(Paneselector);

Paneselector.propTypes = {
  initialPane: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  changePane: PropTypes.func.isRequired,
  simulationTimeSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  modelPositionSeries: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  rollSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  pitchSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ConnectedPaneselector;
