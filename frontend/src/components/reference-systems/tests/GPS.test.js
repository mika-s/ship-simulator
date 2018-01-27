import React from 'react';
import ReactDOM from 'react-dom';
import GPS from '../GPS';

it('renders without crashing', () => {
  const tbody = document.createElement('tbody');
  ReactDOM.render(<GPS
    gpsData={{
      number: 1, position: { latitude: 0.0, longitude: 0.0 }, speed: 0.0, direction: 0.0,
    }}
  />, tbody);
});
