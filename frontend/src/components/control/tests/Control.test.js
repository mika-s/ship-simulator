import React from 'react';
import ReactDOM from 'react-dom';
import { UnconnectedControl } from '../Control';
import { vesselControlMode } from '../../../util/enums';

it('renders without crashing', () => {
  function setAutopilotHeading() { }
  function setAutopilotSpeed() { }
  function setAlphaForHeading() { }
  function setBetaForHeading() { }
  function setAutopilotPgain() { }
  function setAutopilotIgain() { }
  function setAutopilotDgain() { }
  function toggleAutopilot() { }
  function setThrusterDemand() { }
  function setControlMode() { }
  function setSpeedPgain() { }
  function setSpeedIgain() { }
  function setSpeedDgain() { }

  const thrusters = [];
  const headingGain = { p: 0.0, i: 0.0, d: 0.0 };
  const speedGain = { p: 0.0, i: 0.0, d: 0.0 };

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
    headingGain={headingGain}
    speedGain={speedGain}
    setControlMode={setControlMode}
    setAutopilotHeading={setAutopilotHeading}
    setAutopilotSpeed={setAutopilotSpeed}
    setAlphaForHeading={setAlphaForHeading}
    setBetaForHeading={setBetaForHeading}
    setAutopilotPgain={setAutopilotPgain}
    setAutopilotIgain={setAutopilotIgain}
    setAutopilotDgain={setAutopilotDgain}
    setSpeedPgain={setSpeedPgain}
    setSpeedIgain={setSpeedIgain}
    setSpeedDgain={setSpeedDgain}
    toggleAutopilot={toggleAutopilot}
  />, div);
});
