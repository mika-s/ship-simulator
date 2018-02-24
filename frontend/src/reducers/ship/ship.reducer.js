import gpsReducer from './gps.reducer';
import gyroReducer from './gyro.reducer';
import mruReducer from './mru.reducer';
import thrusterReducer from './thruster.reducer';
import windsensorReducer from './windsensor.reducer';

/**
* The reducer for the ship section
* @param {Object}    state        The state object (rootstate.ship).
* @param {Object}    action       The action object.
* @param {Object}    model        Vessel model object.
* @param {Object}    control      Controller object.
* @param {Object}    demands      Thruster demands array.
* @param {Object}    envWind      Environmental values for wind.
* @returns {Object} The ship section updated.
*/
export default function shipReducer(state, action, model, control, demands, envWind) {
  return {
    ...state,

    thrusters: state.thrusters.map((thruster, i) =>
      thrusterReducer(thruster, action, control, demands[i])),

    sensors: {
      gyrocompasses: state.sensors.gyrocompasses.map(gyrocompass =>
        gyroReducer(gyrocompass, action, model.position.heading, model.velocity.r)),

      mrus: state.sensors.mrus.map(mru =>
        mruReducer(mru, action, 0.0, 0.0)),

      windsensors: state.sensors.windsensors.map(windsensor =>
        windsensorReducer(windsensor, action, model, envWind)),
    },

    referencesystems: {
      gpses: state.referencesystems.gpses.map(gps =>
        gpsReducer(gps, action, model)),
    },
  };
}
