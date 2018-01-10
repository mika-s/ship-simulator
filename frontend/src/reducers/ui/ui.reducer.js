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

export default function uiReducer(state, action) {
  switch (action.type) {
    case 'SET_THRUSTER_DEMAND':
      return {
        ...state,

        thrusters: state.thrusters.map((thruster) => {
          if (thruster.number === action.payload.number) {
            thruster.demand[action.payload.type] = action.payload.demand;
          }
          return thruster;
        }),
      };
    case 'SET_CURRENT_SPEED':
      return {
        ...state,

        current: {
          ...state.current,
          speed: action.payload.speed,
        },
      };
    case 'SET_CURRENT_DIRECTION':
      return {
        ...state,

        current: {
          ...state.current,
          direction: action.payload.direction,
        },
      };
    case 'SET_WIND_SPEED':
      return {
        ...state,

        wind: {
          ...state.wind,
          speed: action.payload.speed,
        },
      };
    case 'SET_WIND_DIRECTION':
      return {
        ...state,

        wind: {
          ...state.wind,
          direction: action.payload.direction,
        },
      };
    case 'SET_INITIAL_POSITION':
      return {
        ...state,

        position: action.payload.position,
      };
    case 'SET_DASHBOARD_PANE':
      return {
        ...state,

        dashboard: {
          ...state.dashboard,
          panes: {
            ...state.dashboard.panes,
            [action.payload.number]: action.payload.pane,
          },
        },
      };
    case 'INC_ZOOM_LEVEL':
      return {
        ...state,

        map: {
          ...state.map,
          zoomlevel: incrementZoomlevel(state.map.zoomlevel),
        },
      };
    case 'DEC_ZOOM_LEVEL':
      return {
        ...state,

        map: {
          ...state.map,
          zoomlevel: decrementZoomlevel(state.map.zoomlevel),
        },
      };
    case 'TOGGLE_MOTION_TYPE':
      return {
        ...state,

        map: {
          ...state.map,
          motion: state.map.motion === motion.TRUE ? motion.RELATIVE : motion.TRUE,
        },
      };
    default:
      return state;
  }
}
