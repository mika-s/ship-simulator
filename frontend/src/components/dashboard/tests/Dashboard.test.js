import React from 'react';
import { shallow } from 'enzyme';
import { UnconnectedDashboard } from '../Dashboard';

it('renders without crashing', () => {
  function setDashboardPane() { }
  function toggleAutoAxis() { }
  function setMinMax() { }
  function setMinMax2() { }
  function setMinMax3() { }
  function setMinMax4() { }

  const minMaxShape = {
    heading: 123.0,
    heading2: 123.0,
    heading3: 123.0,
    gpsspeed: 123.0,
    position: 123.0,
    position2: 123.0,
    thrusters: 123.0,
    rollpitch: 123.0,
    alphabetaHeading: 123.0,
    alphabetaHeading2: 123.0,
    autopilotHeadingPid: 123.0,
    autopilotHeadingPid2: 123.0,
    autopilotHeadingPid3: 123.0,
    autopilotHeadingPid4: 123.0,
    autopilotSpeedPid: 123.0,
    autopilotSpeedPid2: 123.0,
    autopilotSpeedPid3: 123.0,
    autopilotSpeedPid4: 123.0,
  };

  const panes = {
    1: {
      type: 'heading',
      isAutoAxis: true,
      min: minMaxShape,
      max: minMaxShape,
    },
    2: {
      type: 'rollpitch',
      isAutoAxis: true,
      min: minMaxShape,
      max: minMaxShape,
    },
    3: {
      type: 'alphabetaHeading',
      isAutoAxis: true,
      min: minMaxShape,
      max: minMaxShape,
    },
    4: {
      type: 'gpsspeed',
      isAutoAxis: true,
      min: minMaxShape,
      max: minMaxShape,
    },
  };

  const div = document.createElement('div');
  shallow(<UnconnectedDashboard
    panes={panes}
    setDashboardPane={setDashboardPane}
    toggleAutoAxis={toggleAutoAxis}
    setMinMax={setMinMax}
    setMinMax2={setMinMax2}
    setMinMax3={setMinMax3}
    setMinMax4={setMinMax4}
  />, div);
});
