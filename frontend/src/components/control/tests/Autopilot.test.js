import React from 'react';
import ReactDOM from 'react-dom';
import Autopilot from '../Autopilot';

it('renders without crashing', () => {
  function setAutopilotHeading() {}
  function setAutopilotSpeed() {}
  function setAlphaForHeading() {}
  function setBetaForHeading() {}
  function toggleAutopilot() {}

  const div = document.createElement('div');
  ReactDOM.render(<Autopilot
    active
    initialHeading={0.0}
    initialSpeed={0.0}
    initialAlpha={0.0}
    initialBeta={0.0}
    setAutopilotHeading={setAutopilotHeading}
    setAutopilotSpeed={setAutopilotSpeed}
    setAlphaForHeading={setAlphaForHeading}
    setBetaForHeading={setBetaForHeading}
    toggleAutopilot={toggleAutopilot}
  />, div);
});
