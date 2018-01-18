import { calculateForces as calculateCurrentForces } from './current/current.util';
import { calculateForces as calculateWindForces } from './wind/wind.util';

export default function environmentReducer(
  state, action, uiCurrent, uiWind, vesselSpeed,
  vesselHeading, dimensions, windParams, drag,
) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        current: {
          forces: calculateCurrentForces(
            state.current.speed, state.current.direction,
            vesselHeading, vesselSpeed.r, dimensions, drag,
          ),
          speed: uiCurrent.speed,
          direction: uiCurrent.direction,
        },
        wind: {
          ...state.wind,
          forces: calculateWindForces(
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
