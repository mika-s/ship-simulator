import React from 'react';
import ReactDOM from 'react-dom';
import Pid from '../Pid';

it('renders without crashing', () => {
  function setP() { }
  function setI() { }
  function setD() { }

  const div = document.createElement('div');
  ReactDOM.render(<Pid
    name="Speed"
    initialP={1.7}
    initialI={0.03}
    initialD={2.0}
    setP={setP}
    setI={setI}
    setD={setD}
    min={{ p: 0.0, i: 0.0, d: 0.0 }}
    max={{ p: 0.0, i: 0.0, d: 0.0 }}
  />, div);
});
