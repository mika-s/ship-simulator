import { vesselControlMode } from '../../util/enums';
import { setDemand, getFeedback, getForces, getPower, isAzi } from './thruster.util';

/**
* The reducer for a single thruster.
* @param {Object}    state       The state object (rootstate.ship.thrusters[i]).
* @param {Object}    action      The action object.
* @param {Object}    control     The control object.
* @param {Object}    demand      The thruster demand object.
* @returns {Object} The thruster updated.
*/
export default function thrusterReducer(state, action, control, demand) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        demand: setDemand(state, demand),
        feedback: getFeedback(state),
        force: getForces(state),
        power: getPower(state),
        mode: control.mode,
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        demand: {
          rpm: 0.0,
          pitch: 0.0,
          azimuth: isAzi(state.thrusterType) ? 0.0 : state.demand.azimuth,
        },
        feedback: {
          rpm: 0.0,
          pitch: 0.0,
          azimuth: isAzi(state.thrusterType) ? 0.0 : state.feedback.azimuth,
        },
        force: 0.0,
        power: 0.0,
        mode: vesselControlMode.AUTOPILOT,
      };
    default:
      return state;
  }
}
