export default function dashboardReducer(state, action) {
  switch (action.type) {
    case 'SET_DASHBOARD_PANE':
      return {
        ...state,
        panes: {
          ...state.panes,
          [action.payload.number]: action.payload.pane,
        },
      };

    default:
      return state;
  }
}
