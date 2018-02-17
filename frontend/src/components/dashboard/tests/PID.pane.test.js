import React from 'react';
import ReactDOM from 'react-dom';
import PidPane from '../PID.pane';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PidPane
    isAutoAxis
    min={0}
    max={1}
    min2={0}
    max2={1}
    min3={0}
    max3={1}
    simulationTimeSeries={[1, 2, 3]}
    pSeries={[0.1, 0.2, 0.3]}
    iSeries={[-0.15, -0.21, -0.32]}
    dSeries={[10.1, -20.2, -20.3]}
  />, div);
});
