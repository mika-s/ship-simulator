import CurrentUtil from './current/current.util';
import WindUtil from './wind/wind.util';

export default function environmentReducer(
  state, action, uiCurrent, uiWind, vesselSpeed,
  vesselHeading, rotationSpeed, dimensions, windParams, drag,
) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        current: {
          forces: CurrentUtil.calculateForces(
            state.current.speed, state.current.direction,
            vesselHeading, rotationSpeed, dimensions, drag,
          ),
          speed: uiCurrent.speed,
          direction: uiCurrent.direction,
        },
        wind: {
          ...state.wind,
          forces: WindUtil.calculateForces(
            state.wind.speed, state.wind.direction,
            vesselSpeed, vesselHeading, dimensions, windParams,
          ),
          speed: uiWind.speed,
          direction: uiWind.direction,
        },
      };
    default:
      return state;
  }
}
