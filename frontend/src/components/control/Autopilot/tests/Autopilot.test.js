import React from 'react';
import ReactDOM from 'react-dom';
import Autopilot from '../Autopilot';

it('renders without crashing', () => {
  function setAlphaForHeading() { }
  function setBetaForHeading() { }
  function setAutopilotHeading() { }
  function setAutopilotSpeed() { }
  function setAutopilotPgain() { }
  function setAutopilotIgain() { }
  function setAutopilotDgain() { }
  function setSpeedPgain() { }
  function setSpeedIgain() { }
  function setSpeedDgain() { }
  function toggleAutopilot() { }

  const headingGain = { p: 0.0, i: 0.0, d: 0.0 };
  const speedGain = { p: 0.0, i: 0.0, d: 0.0 };

  const div = document.createElement('div');
  ReactDOM.render(<Autopilot
    active
    initialAlpha={0.1}
    initialBeta={0.03}
    initialHeading={0.1}
    initialSpeed={0.03}
    initialHeadingGain={headingGain}
    initialSpeedGain={speedGain}
    setAlphaForHeading={setAlphaForHeading}
    setBetaForHeading={setBetaForHeading}
    setAutopilotHeading={setAutopilotHeading}
    setAutopilotSpeed={setAutopilotSpeed}
    setAutopilotPgain={setAutopilotPgain}
    setAutopilotIgain={setAutopilotIgain}
    setAutopilotDgain={setAutopilotDgain}
    setSpeedPgain={setSpeedPgain}
    setSpeedIgain={setSpeedIgain}
    setSpeedDgain={setSpeedDgain}
    toggleAutopilot={toggleAutopilot}
  />, div);
});
