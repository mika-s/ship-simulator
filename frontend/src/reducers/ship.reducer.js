import Gyrocompass from './Gyrocompass';
import MRU from './MRU';
import Windsensor from './Windsensor';
import GPS from './GPS';
import Thruster from './Thruster';

export default function shipReducer(state, action, model) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        thrusters: state.thrusters.map(thruster =>
          Thruster.calculate(thruster)),

        sensors: {
          gyrocompasses: state.sensors.gyrocompasses.map(gyrocompass =>
            Gyrocompass.calculateHeading(gyrocompass, model.position.heading)),

          mrus: state.sensors.mrus.map(mru =>
            MRU.calculateRollAndPitch(mru, 0.0, 0.0)),

          windsensors: state.sensors.windsensors.map(windsensor =>
            Windsensor.calculateSpeedAndDirection(
              windsensor, 0.0, 0.0,
              model.velocity, model.position.heading,
            )),
        },

        referencesystems: {
          gpses: state.referencesystems.gpses.map(gps =>
            GPS.measurePosition(gps, model.position.latitude, model.position.longitude)),
        },
      };
    default:
      return state;
  }
}
