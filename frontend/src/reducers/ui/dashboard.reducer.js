export default function dashboardReducer(state, action) {
  switch (action.type) {
    case 'SET_DASHBOARD_PANE':
      return {
        ...state,
        panes: {
          ...state.panes,
          [action.payload.number]: {
            ...state.panes[action.payload.number],
            type: action.payload.pane,
          },
        },
      };
    case 'TOGGLE_AUTO_AXIS':
      return {
        ...state,
        panes: {
          ...state.panes,
          [action.payload.number]: {
            ...state.panes[action.payload.number],
            isAutoAxis: !state.panes[action.payload.number].isAutoAxis,
          },
        },
      };
    default:
      return state;
  }
}
