import React from 'react';
import ReactDOM from 'react-dom';
import ThrusterPane from '../Thrusters.pane';

it('renders without crashing', () => {
  const thrusters = [
    {
      number: 1,
      name: 'Tunnel',
      demand: { pitch: 0.0 },
      feedback: { pitch: 0.0 },
      force: 100.0,
    },
  ];

  const div = document.createElement('div');
  ReactDOM.render(<ThrusterPane
    thrusters={thrusters}
  />, div);
});
