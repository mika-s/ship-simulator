import WindUtil from './wind/WindUtil';

export default function environmentReducer(
  state, action, uiWind, vesselSpeed,
  vesselHeading, dimensions, windParams,
) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
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
