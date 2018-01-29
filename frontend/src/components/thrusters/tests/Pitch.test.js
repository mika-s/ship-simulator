import React from 'react';
import ReactDOM from 'react-dom';
import Pitch from '../Pitch';
import { vesselControlMode } from '../../../util/enums';

it('renders without crashing', () => {
  function setThrusterDemand() {}

  const tbody = document.createElement('tbody');
  ReactDOM.render(<Pitch
    demand={20}
    feedback={30}
    number={1}
    setThrusterDemand={setThrusterDemand}
    mode={vesselControlMode.LEVER}
  />, tbody);
});
