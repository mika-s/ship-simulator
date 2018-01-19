import React from 'react';
import ReactDOM from 'react-dom';
import InitialPosition from '../InitialPosition';

it('renders without crashing', () => {
  function setPosition() { }

  const div = document.createElement('div');
  ReactDOM.render(<InitialPosition
    position={{ latitude: 50, longitude: 0.0 }}
    setPosition={setPosition}
  />, div);
});
