import React from 'react';
import ReactDOM from 'react-dom';
import { UnconnectedControl } from '../Control';
import { vesselControlMode } from '../../../util/enums';

it('renders without crashing', () => {
  function setAutopilotHeading() { }
  function setAutopilotSpeed() { }
  function setAlphaForHeading() { }
  function setBetaForHeading() { }
  function toggleAutopilot() { }
  function setThrusterDemand() { }
  function setControlMode() { }

  const thrusters = [];

  const div = document.createElement('div');
  ReactDOM.render(<UnconnectedControl
    mode={vesselControlMode.LEVER}
    active
    thrusters={thrusters}
    setThrusterDemand={setThrusterDemand}
    heading={0.0}
    speed={0.0}
    alpha={0.0}
    beta={0.0}
    setControlMode={setControlMode}
    setAutopilotHeading={setAutopilotHeading}
    setAutopilotSpeed={setAutopilotSpeed}
    setAlphaForHeading={setAlphaForHeading}
    setBetaForHeading={setBetaForHeading}
    toggleAutopilot={toggleAutopilot}
  />, div);
});
