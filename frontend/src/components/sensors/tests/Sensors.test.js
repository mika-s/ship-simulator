import React from 'react';
import ReactDOM from 'react-dom';
import { UnconnectedSensors } from '../Sensors';

it('renders without crashing', () => {
  const windsensors = [];
  const gyrocompasses = [];
  const mrus = [];

  const div = document.createElement('div');
  ReactDOM.render(<UnconnectedSensors
    windsensors={windsensors}
    gyrocompasses={gyrocompasses}
    mrus={mrus}
  />, div);
});
