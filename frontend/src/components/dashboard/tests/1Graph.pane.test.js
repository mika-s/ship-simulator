import React from 'react';
import ReactDOM from 'react-dom';
import OneGraphPane from '../1Graph.pane';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OneGraphPane
    isAutoAxis
    min={0}
    max={1}
    firstLabel="Test"
    color1={{ r: 0, g: 0, b: 0 }}
    timeSeries={[1, 2, 3]}
    firstSeries={[0.1, 0.2, 0.3]}
  />, div);
});
