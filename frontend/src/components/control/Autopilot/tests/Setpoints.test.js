import React from 'react';
import ReactDOM from 'react-dom';
import Setpoints from '../Setpoints';

it('renders without crashing', () => {
  function setAutopilotHeading() { }
  function setAutopilotSpeed() { }

  const div = document.createElement('div');
  ReactDOM.render(<Setpoints
    initialHeading={0.1}
    initialSpeed={0.03}
    setAutopilotHeading={setAutopilotHeading}
    setAutopilotSpeed={setAutopilotSpeed}
  />, div);
});
