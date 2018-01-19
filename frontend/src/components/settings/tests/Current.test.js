import React from 'react';
import ReactDOM from 'react-dom';
import Current from '../Current';

it('renders without crashing', () => {
  function setCurrentSpeed() { }
  function setCurrentDirection() { }

  const div = document.createElement('div');
  ReactDOM.render(<Current
    speed={0.5}
    direction={130}
    setCurrentSpeed={setCurrentSpeed}
    setCurrentDirection={setCurrentDirection}
  />, div);
});
