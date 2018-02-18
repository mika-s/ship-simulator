import React from 'react';
import ReactDOM from 'react-dom';
import SensorPane from '../Sensor.pane';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SensorPane
    isAutoAxis
    min={0}
    max={1}
    timeSeries={[1, 2, 3]}
    rollSeries={[0.1, 0.2, 0.3]}
    pitchSeries={[0.1, 0.2, 0.3]}
  />, div);
});
