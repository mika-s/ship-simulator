export function increaseZoomlevel() {
  return {
    type: 'INC_ZOOM_LEVEL',
  };
}

export function decreaseZoomlevel() {
  return {
    type: 'DEC_ZOOM_LEVEL',
  };
}

export function toggleMotion() {
  return {
    type: 'TOGGLE_MOTION_TYPE',
  };
}
