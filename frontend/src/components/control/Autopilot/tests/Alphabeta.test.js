import React from 'react';
import ReactDOM from 'react-dom';
import Alphabeta from '../Alphabeta';

it('renders without crashing', () => {
  function setAlphaForHeading() { }
  function setBetaForHeading() { }

  const div = document.createElement('div');
  ReactDOM.render(<Alphabeta
    initialAlpha={0.1}
    initialBeta={0.03}
    setAlphaForHeading={setAlphaForHeading}
    setBetaForHeading={setBetaForHeading}
  />, div);
});
