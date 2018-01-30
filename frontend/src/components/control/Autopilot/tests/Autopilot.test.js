import React from 'react';
import ReactDOM from 'react-dom';
import Autopilot from '../Autopilot';

it('renders without crashing', () => {
  function setAlphaForHeading() { }
  function setBetaForHeading() { }
  function setAutopilotHeading() { }
  function setAutopilotSpeed() { }
  function toggleAutopilot() { }

  const div = document.createElement('div');
  ReactDOM.render(<Autopilot
    active
    initialAlpha={0.1}
    initialBeta={0.03}
    initialHeading={0.1}
    initialSpeed={0.03}
    setAlphaForHeading={setAlphaForHeading}
    setBetaForHeading={setBetaForHeading}
    setAutopilotHeading={setAutopilotHeading}
    setAutopilotSpeed={setAutopilotSpeed}
    toggleAutopilot={toggleAutopilot}
  />, div);
});
