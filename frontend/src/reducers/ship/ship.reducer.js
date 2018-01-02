import gpsReducer from './gps.reducer';
import gyroReducer from './gyro.reducer';
import mruReducer from './mru.reducer';
import thrusterReducer from './thruster.reducer';
import windsensorReducer from './windsensor.reducer';

export default function shipReducer(state, action, model, uiThrusters, envWind) {
  return {
    ...state,

    thrusters: state.thrusters.map((thruster, i) =>
      thrusterReducer(thruster, action, uiThrusters[i].demand)),

    sensors: {
      gyrocompasses: state.sensors.gyrocompasses.map(gyrocompass =>
        gyroReducer(gyrocompass, action, model.position.heading)),

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
