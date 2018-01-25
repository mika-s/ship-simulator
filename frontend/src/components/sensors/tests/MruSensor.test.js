import React from 'react';
import ReactDOM from 'react-dom';
import MruSensor from '../MruSensor';

it('renders without crashing', () => {
  const tbody = document.createElement('tbody');
  ReactDOM.render(<MruSensor
    mruSensorData={{ number: 1, roll: -0.2, pitch: 0.1 }}
  />, tbody);
});
