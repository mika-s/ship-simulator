import React from 'react';
import ReactDOM from 'react-dom';
import WindSensor from '../WindSensor';

it('renders without crashing', () => {
  const tbody = document.createElement('tbody');
  ReactDOM.render(<WindSensor
    windSensorData={{ number: 1, speed: 10.5, direction: 123.1 }}
  />, tbody);
});
