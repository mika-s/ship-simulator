import React from 'react';
import ReactDOM from 'react-dom';
import FourGraphPane from '../4Graph.pane';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FourGraphPane
    isAutoAxis
    min={0}
    max={1}
    min2={0}
    max2={1}
    min3={0}
    max3={1}
    min4={0}
    max4={1}
    firstLabel="Test"
    secondLabel="Test"
    thirdLabel="Test"
    fourthLabel="Test"
    color1={{ r: 0, g: 0, b: 0 }}
    color2={{ r: 0, g: 0, b: 0 }}
    color3={{ r: 0, g: 0, b: 0 }}
    color4={{ r: 0, g: 0, b: 0 }}
    timeSeries={[1, 2, 3]}
    firstSeries={[0.1, 0.2, 0.3]}
    secondSeries={[0.1, 0.2, 0.3]}
    thirdSeries={[0.1, 0.2, 0.3]}
    fourthSeries={[0.1, 0.2, 0.3]}
  />, div);
});
