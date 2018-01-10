import { motion } from '../../util/enums';
import UiThruster from '../constructors/uithruster';

const uiInitialState = {
  thrusters: [],
  current: {
    speed: 0.0,
    direction: 0.0,
  },
  wind: {
    speed: 0.0,
    direction: 0.0,
  },
  position: {
    latitude: 0.0,
    longitude: 0.0,
    heading: 0.0,
  },
  dashboard: {
    panes: {
      1: 'heading',
      2: 'rollpitch',
      3: 'position',
      4: 'thrusters',
    },
  },
  map: {
    zoomlevel: 5, // 0 to 19
    motion: motion.TRUE,
  },
};

function getInitialState(InitialVessel) {
  uiInitialState.position = InitialVessel.model.position;

  for (let thrIdx = 0; thrIdx < InitialVessel.thrusters.length; thrIdx += 1) {
    uiInitialState.thrusters.push(new UiThruster(InitialVessel.thrusters[thrIdx]));
  }

  return uiInitialState;
}

export default getInitialState;
