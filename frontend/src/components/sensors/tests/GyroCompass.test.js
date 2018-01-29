import React from 'react';
import ReactDOM from 'react-dom';
import GyroCompass from '../GyroCompass';

it('renders without crashing', () => {
  const tbody = document.createElement('tbody');
  ReactDOM.render(<GyroCompass
    gyroCompassData={{ number: 1, heading: 0.0, rot: 0.0 }}
  />, tbody);
});
