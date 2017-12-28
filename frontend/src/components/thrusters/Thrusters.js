import * as PubSub from 'pubsub-js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Thruster from '../thruster/Thruster';
import './Thrusters.css';

class Thrusters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thrusters: props.thrusters,
    };
  }

  componentDidMount() {
    const thrustersSubscriber = (msg, data) => {
      this.setState({ thrusters: data });
    };

    this.thrustersToken = PubSub.subscribe('thrusters', thrustersSubscriber);
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.thrustersToken);
  }

  render() {
    const thrusterElements = this.state.thrusters.map(thruster =>
      <Thruster key={thruster.number} thrusterData={thruster} />);

    return (
      <div className="thrusters">
        <h2>Thrusters</h2>
        {thrusterElements}
      </div>
    );
  }
}

Thrusters.propTypes = {
  thrusters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Thrusters;
