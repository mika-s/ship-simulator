import { motion } from '../../util/enums';

function incrementZoomlevel(oldZoomlevel) {
  const maxZoomlevel = 19;

  const newZoomlevel = Math.min(maxZoomlevel, oldZoomlevel + 1);

  return newZoomlevel;
}

function decrementZoomlevel(oldZoomlevel) {
  const minZoomlevel = 0;

  const newZoomlevel = Math.max(minZoomlevel, oldZoomlevel - 1);

  return newZoomlevel;
}

export default function mapReducer(state, action) {
  switch (action.type) {
    case 'INC_ZOOM_LEVEL':
      return {
        ...state,
        zoomlevel: incrementZoomlevel(state.zoomlevel),
      };
    case 'DEC_ZOOM_LEVEL':
      return {
        ...state,
        zoomlevel: decrementZoomlevel(state.zoomlevel),
      };
    case 'TOGGLE_MOTION_TYPE':
      return {
        ...state,
        motion: state.motion === motion.TRUE ? motion.RELATIVE : motion.TRUE,
      };
    default:
      return state;
  }
}
