import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setDashboardPane, toggleAutoAxis, setMinMax, setMinMax2, setMinMax3,
} from '../../actions/ui.dashboard.actions';
import Paneselector from './Paneselector';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.setMinMax = this.setMinMax.bind(this);
    this.setMinMax2 = this.setMinMax2.bind(this);
    this.setMinMax3 = this.setMinMax3.bind(this);
    this.changePane = this.changePane.bind(this);
    this.toggleAutoAxis = this.toggleAutoAxis.bind(this);
  }

  setMinMax(number, min, max) {
    this.props.setMinMax(number, min, max);
  }

  setMinMax2(number, min, max) {
    this.props.setMinMax2(number, min, max);
  }

  setMinMax3(number, min, max) {
    this.props.setMinMax3(number, min, max);
  }

  changePane(event, number) {
    const newPane = event.target.value;
    this.props.setDashboardPane(number, newPane);
  }

  toggleAutoAxis(number) {
    this.props.toggleAutoAxis(number);
  }

  render() {
    return (
      <div className="dashboard">
        <div className="row">
          <div className="col-lg-6 pane">
            <Paneselector
              number={1}
              initialPane={this.props.panes[1].type}
              initialSettings={{
                isAutoAxis: this.props.panes[1].isAutoAxis,
                min: this.props.panes[1].min,
                max: this.props.panes[1].max,
              }}
              changePane={this.changePane}
              toggleAutoAxis={this.toggleAutoAxis}
              setMinMax={this.setMinMax}
              setMinMax2={this.setMinMax2}
              setMinMax3={this.setMinMax3}
            />
          </div>
          <div className="col-lg-6 pane">
            <Paneselector
              number={2}
              initialPane={this.props.panes[2].type}
              initialSettings={{
                isAutoAxis: this.props.panes[2].isAutoAxis,
                min: this.props.panes[2].min,
                max: this.props.panes[2].max,
              }}
              changePane={this.changePane}
              toggleAutoAxis={this.toggleAutoAxis}
              setMinMax={this.setMinMax}
              setMinMax2={this.setMinMax2}
              setMinMax3={this.setMinMax3}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 pane">
            <Paneselector
              number={3}
              initialPane={this.props.panes[3].type}
              initialSettings={{
                isAutoAxis: this.props.panes[3].isAutoAxis,
                min: this.props.panes[3].min,
                max: this.props.panes[3].max,
              }}
              changePane={this.changePane}
              toggleAutoAxis={this.toggleAutoAxis}
              setMinMax={this.setMinMax}
              setMinMax2={this.setMinMax2}
              setMinMax3={this.setMinMax3}
            />
          </div>
          <div className="col-lg-6 pane">
            <Paneselector
              number={4}
              initialPane={this.props.panes[4].type}
              initialSettings={{
                isAutoAxis: this.props.panes[4].isAutoAxis,
                min: this.props.panes[4].min,
                max: this.props.panes[4].max,
              }}
              changePane={this.changePane}
              toggleAutoAxis={this.toggleAutoAxis}
              setMinMax={this.setMinMax}
              setMinMax2={this.setMinMax2}
              setMinMax3={this.setMinMax3}
            />
          </div>
        </div>
      </div>
    );
  }
}

const minMaxShape = PropTypes.shape({
  heading: PropTypes.number.isRequired,
  gpsspeed: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  position2: PropTypes.number.isRequired,
  thrusters: PropTypes.number.isRequired,
  rollpitch: PropTypes.number.isRequired,
  alphabetaHeading: PropTypes.number.isRequired,
  alphabetaHeading2: PropTypes.number.isRequired,
  autopilotHeadingPid: PropTypes.number.isRequired,
  autopilotHeadingPid2: PropTypes.number.isRequired,
  autopilotHeadingPid3: PropTypes.number.isRequired,
  autopilotSpeedPid: PropTypes.number.isRequired,
  autopilotSpeedPid2: PropTypes.number.isRequired,
  autopilotSpeedPid3: PropTypes.number.isRequired,
}).isRequired;

Dashboard.propTypes = {
  panes: PropTypes.objectOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    isAutoAxis: PropTypes.bool.isRequired,
    min: minMaxShape,
    max: minMaxShape,
  })).isRequired,
  setDashboardPane: PropTypes.func.isRequired,
  toggleAutoAxis: PropTypes.func.isRequired,
  setMinMax: PropTypes.func.isRequired,
  setMinMax2: PropTypes.func.isRequired,
  setMinMax3: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  panes: state.ui.dashboard.panes,
});

const mapDispatchToProps = dispatch => ({
  setDashboardPane: (number, pane) => dispatch(setDashboardPane(number, pane)),
  toggleAutoAxis: number => dispatch(toggleAutoAxis(number)),
  setMinMax: (number, min, max) => dispatch(setMinMax(number, min, max)),
  setMinMax2: (number, min, max) => dispatch(setMinMax2(number, min, max)),
  setMinMax3: (number, min, max) => dispatch(setMinMax3(number, min, max)),
});

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default ConnectedDashboard;
