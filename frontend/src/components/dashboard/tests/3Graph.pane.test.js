import React from 'react';
import ReactDOM from 'react-dom';
import ThreeGraphPane from '../3Graph.pane';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ThreeGraphPane
    isAutoAxis
    min={0}
    max={1}
    min2={0}
    max2={1}
    min3={0}
    max3={1}
    firstLabel="Test"
    secondLabel="Test"
    thirdLabel="Test"
    color1={{ r: 0, g: 0, b: 0 }}
    color2={{ r: 0, g: 0, b: 0 }}
    color3={{ r: 0, g: 0, b: 0 }}
    timeSeries={[1, 2, 3]}
    firstSeries={[0.1, 0.2, 0.3]}
    secondSeries={[0.1, 0.2, 0.3]}
    thirdSeries={[0.1, 0.2, 0.3]}
  />, div);
});
