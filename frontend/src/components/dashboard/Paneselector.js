import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    return (
      <div>
        <form className="form-inline">
          <select className="form-control mb-2 mr-sm-2 mb-sm-0" defaultValue={this.props.initialPane} onChange={this.changePane}>
            <option value="heading">Heading</option>
            <option value="position">Position</option>
            <option value="sensors">Sensors</option>
            <option value="thrusters">Thrusters</option>
          </select>
        </form>
        {this.state.pane === 'heading' && <HeadingPane />}
        {this.state.pane === 'sensors' && <SensorPane />}
      </div>
    );
  }
}

Paneselector.propTypes = {
  initialPane: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  changePane: PropTypes.func.isRequired,
};

export default Paneselector;
