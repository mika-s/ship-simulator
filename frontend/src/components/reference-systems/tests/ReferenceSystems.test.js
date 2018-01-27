import React from 'react';
import ReactDOM from 'react-dom';
import { UnconnectedReferenceSystems } from '../ReferenceSystems';

it('renders without crashing', () => {
  const gpses = [];

  const div = document.createElement('div');
  ReactDOM.render(<UnconnectedReferenceSystems
    gpses={gpses}
  />, div);
});
