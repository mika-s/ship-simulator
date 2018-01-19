import React from 'react';
import ReactDOM from 'react-dom';
import Wind from '../Wind';

it('renders without crashing', () => {
  function setWindSpeed() { }
  function setWindDirection() { }

  const div = document.createElement('div');
  ReactDOM.render(<Wind
    speed={0.5}
    direction={130}
    setWindSpeed={setWindSpeed}
    setWindDirection={setWindDirection}
  />, div);
});
