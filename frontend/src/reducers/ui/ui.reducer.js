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
    default:
      return state;
  }
}