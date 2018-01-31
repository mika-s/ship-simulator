import React from 'react';
import ReactDOM from 'react-dom';
import Pid from '../Pid';

it('renders without crashing', () => {
  function setP() { }
  function setI() { }
  function setD() { }

  const div = document.createElement('div');
  ReactDOM.render(<Pid
    initialP={1.7}
    initialI={0.03}
    initialD={2.0}
    setP={setP}
    setI={setI}
    setD={setD}
  />, div);
});
