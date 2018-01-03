import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDashboardPane } from '../../actions/ui.dashboard.actions';
import Paneselector from './Paneselector';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.changePane = this.changePane.bind(this);
  }

  changePane(event, number) {
    const newPane = event.target.value;
    this.props.setDashboardPane(number, newPane);
  }

  render() {
    return (
      <div className="dashboard">
        <div className="row">
          <div className="col-lg-6">
            <Paneselector
              number={1}
              initialPane={this.props.panes[1]}
              changePane={this.changePane}
            />
          </div>
          <div className="col-lg-6">
            <Paneselector
              number={2}
              initialPane={this.props.panes[2]}
              changePane={this.changePane}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <Paneselector
              number={3}
              initialPane={this.props.panes[3]}
              changePane={this.changePane}
            />
          </div>
          <div className="col-lg-6">
            <Paneselector
              number={4}
              initialPane={this.props.panes[4]}
              changePane={this.changePane}
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
});

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

Dashboard.propTypes = {
  panes: PropTypes.objectOf(PropTypes.string).isRequired,
  setDashboardPane: PropTypes.func.isRequired,
};

export default ConnectedDashboard;
