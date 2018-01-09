import { motion } from '../../util/enums';

const uiInitialState = {
  thrusters: [],
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

export default uiInitialState;
