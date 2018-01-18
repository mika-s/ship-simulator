import React from 'react';
import ReactDOM from 'react-dom';
import { UnconnectedSimulatorControl } from '../SimulatorControl';

it('renders without crashing', () => {
  function onSimulateClick() { }
  function onPauseClick() { }
  function onStopClick() { }

  const div = document.createElement('div');
  ReactDOM.render(<UnconnectedSimulatorControl
    time={1}
    state={1}
    onSimulateClick={onSimulateClick}
    onPauseClick={onPauseClick}
    onStopClick={onStopClick}
  />, div);
});
