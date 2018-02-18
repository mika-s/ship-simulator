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
    case 'SET_MIN_MAX_AXIS':
      return {
        ...state,
        panes: {
          ...state.panes,
          [action.payload.number]: {
            ...state.panes[action.payload.number],
            min: {
              ...state.panes[action.payload.number].min,
              [state.panes[action.payload.number].type]: action.payload.min,
            },
            max: {
              ...state.panes[action.payload.number].max,
              [state.panes[action.payload.number].type]: action.payload.max,
            },
          },
        },
      };
    case 'SET_MIN_MAX2_AXIS':
      return {
        ...state,
        panes: {
          ...state.panes,
          [action.payload.number]: {
            ...state.panes[action.payload.number],
            min: {
              ...state.panes[action.payload.number].min,
              [`${state.panes[action.payload.number].type}2`]: action.payload.min,
            },
            max: {
              ...state.panes[action.payload.number].max,
              [`${state.panes[action.payload.number].type}2`]: action.payload.max,
            },
          },
        },
      };
    case 'SET_MIN_MAX3_AXIS':
      return {
        ...state,
        panes: {
          ...state.panes,
          [action.payload.number]: {
            ...state.panes[action.payload.number],
            min: {
              ...state.panes[action.payload.number].min,
              [`${state.panes[action.payload.number].type}3`]: action.payload.min,
            },
            max: {
              ...state.panes[action.payload.number].max,
              [`${state.panes[action.payload.number].type}3`]: action.payload.max,
            },
          },
        },
      };
    case 'SET_MIN_MAX4_AXIS':
      return {
        ...state,
        panes: {
          ...state.panes,
          [action.payload.number]: {
            ...state.panes[action.payload.number],
            min: {
              ...state.panes[action.payload.number].min,
              [`${state.panes[action.payload.number].type}4`]: action.payload.min,
            },
            max: {
              ...state.panes[action.payload.number].max,
              [`${state.panes[action.payload.number].type}4`]: action.payload.max,
            },
          },
        },
      };
    default:
      return state;
  }
}
