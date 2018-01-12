import dashboardReducer from './dashboard.reducer';
import currentReducer from './current.reducer';
import windReducer from './wind.reducer';
import mapReducer from './map.reducer';
import positionReducer from './position.reducer';
import thrusterReducer from './thruster.reducer';

export default function uiReducer(state, action) {
  return {
    ...state,
    thrusters: thrusterReducer(state.thrusters, action),
    current: currentReducer(state.current, action),
    wind: windReducer(state.wind, action),
    position: positionReducer(state.position, action),
    dashboard: dashboardReducer(state.dashboard, action),
    map: mapReducer(state.map, action),
  };
}
