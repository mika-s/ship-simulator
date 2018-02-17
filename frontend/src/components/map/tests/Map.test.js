import React from 'react';
import ReactDOM from 'react-dom';
import { UnconnectedMap } from '../Map';
import { motion } from '../../../util/enums';

it('renders without crashing', () => {
  function increaseZoomlevel() { }
  function decreaseZoomlevel() { }
  function toggleMotion() { }

  const position = {
    latitude: [50.0],
    longitude: [2.0],
  };

  const div = document.createElement('div');
  ReactDOM.render(<UnconnectedMap
    simulationTime={1}
    position={position}
    zoomlevel={5}
    motion={motion.RELATIVE}
    increaseZoomlevel={increaseZoomlevel}
    decreaseZoomlevel={decreaseZoomlevel}
    toggleMotion={toggleMotion}
  />, div);
});
