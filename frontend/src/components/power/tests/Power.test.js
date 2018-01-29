import React from 'react';
import ReactDOM from 'react-dom';
import { UnconnectedPower } from '../Power';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UnconnectedPower />, div);
});
