import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDashboardPane, toggleAutoAxis } from '../../actions/ui.dashboard.actions';
import Paneselector from './Paneselector';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.changePane = this.changePane.bind(this);
    this.toggleAutoAxis = this.toggleAutoAxis.bind(this);
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
              initialSettings={{ isAutoAxis: this.props.panes[1].isAutoAxis }}
              changePane={this.changePane}
              toggleAutoAxis={this.toggleAutoAxis}
            />
          </div>
          <div className="col-lg-6 pane">
            <Paneselector
              number={2}
              initialPane={this.props.panes[2].type}
              initialSettings={{ isAutoAxis: this.props.panes[2].isAutoAxis }}
              changePane={this.changePane}
              toggleAutoAxis={this.toggleAutoAxis}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 pane">
            <Paneselector
              number={3}
              initialPane={this.props.panes[3].type}
              initialSettings={{ isAutoAxis: this.props.panes[3].isAutoAxis }}
              changePane={this.changePane}
              toggleAutoAxis={this.toggleAutoAxis}
            />
          </div>
          <div className="col-lg-6 pane">
            <Paneselector
              number={4}
              initialPane={this.props.panes[4].type}
              initialSettings={{ isAutoAxis: this.props.panes[4].isAutoAxis }}
              changePane={this.changePane}
              toggleAutoAxis={this.toggleAutoAxis}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  panes: state.ui.dashboard.panes,
});

const mapDispatchToProps = dispatch => ({
  setDashboardPane: (number, pane) => dispatch(setDashboardPane(number, pane)),
  toggleAutoAxis: number => dispatch(toggleAutoAxis(number)),
});

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

Dashboard.propTypes = {
  panes: PropTypes.objectOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    isAutoAxis: PropTypes.bool.isRequired,
  })).isRequired,
  setDashboardPane: PropTypes.func.isRequired,
  toggleAutoAxis: PropTypes.func.isRequired,
};

export default ConnectedDashboard;
