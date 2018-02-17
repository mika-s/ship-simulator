import React from 'react';
import ReactDOM from 'react-dom';
import GpsSpeed from '../GpsSpeed.pane';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GpsSpeed
    isAutoAxis
    min={0}
    max={1}
    min2={0}
    max2={1}
    min3={0}
    max3={1}
    simulationTimeSeries={[1, 2, 3]}
    speedSeries={[0.1, 0.2, 0.3]}
  />, div);
});
