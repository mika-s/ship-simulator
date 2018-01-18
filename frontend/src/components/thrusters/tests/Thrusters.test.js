import React from 'react';
import ReactDOM from 'react-dom';
import { UnconnectedThrusters } from '../Thrusters';

it('renders without crashing', () => {
  function setThrusterDemand() { }
  const thrusters = [{
    number: 1,
    name: 'Tunnel',
    thrusterType: 'azimuth',
    controlType: 'rpm',
    maxPower: { positive: 2000, negative: 2000 },
    location: { x: 45.0, y: -7.0 },
    risetimes: {
      azimuth: { positive: 10, negative: -10 },
      rpm: { positive: 10, negative: -10 },
    },
    force: 54.1,
    power: 1200,
    demand: {
      azimuth: 45.0,
      rpm: 20.0,
    },
    feedback: {
      azimuth: 45.0,
      rpm: 18.0,
    },
  }];

  const div = document.createElement('div');
  ReactDOM.render(<UnconnectedThrusters
    thrusters={thrusters}
    setThrusterDemand={setThrusterDemand}
  />, div);
});
