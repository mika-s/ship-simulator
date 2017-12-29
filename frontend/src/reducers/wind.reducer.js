export default function reducer(state = {
  speed: 0.0,
  direction: 0.0,
}, action) {
  switch (action.type) {
    case 'SET_SPEED': {
      return { ...state, speed: action.payload.speed };
    }
    case 'SET_DIRECTION': {
      return { ...state, direction: action.payload.direction };
    }
    case 'RESET': {
      return { ...state, speed: 0.0, direction: 0.0 };
    }
    default: {
      return state;
    }
  }
}
