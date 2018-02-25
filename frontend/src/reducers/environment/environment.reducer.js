import { calculateForces as calculateCurrentForces } from './current/current.util';
import { calculateForces as calculateWindForces } from './wind/wind.util';

/**
* The reducer for the environment section.
* @param {Object}    state          The state object (rootstate.estimator).
* @param {Object}    action         The action object.
* @param {Object}    uiCurrent      The UI current object.
* @param {Object}    uiWind         The UI wind object.
* @param {Object}    vesselSpeed    Speed of the vessel in m/s and rad/s.
* @param {number}    vesselHeading  Heading of the vessel in radians.
* @param {Object}    dimensions     Dimension object.
* @param {Object}    windParams     Wind parameter object.
* @param {Object}    drag           The drag coefficients object.
* @returns {Object} The environment section updated.
*/
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
