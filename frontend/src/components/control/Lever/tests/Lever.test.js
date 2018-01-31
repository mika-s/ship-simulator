import React from 'react';
import ReactDOM from 'react-dom';
import Lever from '../Lever';

it('renders without crashing', () => {
  function setThrusterDemand() { }

  const thrusters = [];

  const div = document.createElement('div');
  ReactDOM.render(<Lever
    thrusters={thrusters}
    setThrusterDemand={setThrusterDemand}
  />, div);
});
