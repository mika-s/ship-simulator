import { truncToDecimal, roundToDecimal } from '../../util/general.util';
import { updateArray } from './timeseries.util';

/**
* The reducer for the timeseries section.
* @param {Object}    state               The state object (rootstate.estimator).
* @param {Object}    action              The action object.
* @param {number}    time                Simulation time.
* @param {Object}    estimated           Estimated values from the estimator.
* @param {Object}    autopilot           Autopilot object.
* @param {Object}    model               Vessel model object.
* @param {Object}    sensors             Sensors object.
* @param {Object}    referencesystems    Reference systems object.
* @returns {Object} The timeseries section updated.
*/
export default function timeseriesReducer(
  state, action, time, estimated, autopilot,
  model, sensors, referencesystems,
) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        time: updateArray(state.time, time + 1),
        estimator: {
          alphabeta: {
            position: {
              latitude: updateArray(
                state.estimator.alphabeta.position.latitude,
                truncToDecimal(estimated.position.latitude, 7),
              ),
              longitude: updateArray(
                state.estimator.alphabeta.position.longitude,
                truncToDecimal(estimated.position.longitude, 7),
              ),
              heading: updateArray(
                state.estimator.alphabeta.position.heading,
                truncToDecimal(estimated.position.heading, 2),
              ),
            },
            velocity: {
              u: updateArray(
                state.estimator.alphabeta.velocity.u,
                truncToDecimal(estimated.velocity.u, 1),
              ),
              v: updateArray(
                state.estimator.alphabeta.velocity.v,
                truncToDecimal(estimated.velocity.v, 1),
              ),
              r: updateArray(
                state.estimator.alphabeta.velocity.r,
                truncToDecimal(estimated.velocity.r, 1),
              ),
            },
          },
        },
        autopilot: {
          ...state.autopilot,
          controllers: {
            ...state.autopilot.controllers,
            headingPid: {
              ...state.autopilot.controllers.headingPid,
              total: updateArray(
                state.autopilot.controllers.headingPid.total,
                roundToDecimal(autopilot.headingPid.p +
                  autopilot.headingPid.i + autopilot.headingPid.d, 3),
              ),
              p: updateArray(
                state.autopilot.controllers.headingPid.p,
                truncToDecimal(autopilot.headingPid.p, 3),
              ),
              i: updateArray(
                state.autopilot.controllers.headingPid.i,
                truncToDecimal(autopilot.headingPid.i, 3),
              ),
              d: updateArray(
                state.autopilot.controllers.headingPid.d,
                truncToDecimal(autopilot.headingPid.d, 3),
              ),
            },
            speedPid: {
              ...state.autopilot.controllers.speedPid,
              total: updateArray(
                state.autopilot.controllers.speedPid.total,
                roundToDecimal(autopilot.speedPid.p +
                  autopilot.speedPid.i + autopilot.speedPid.d, 3),
              ),
              p: updateArray(
                state.autopilot.controllers.speedPid.p,
                truncToDecimal(autopilot.speedPid.p, 3),
              ),
              i: updateArray(
                state.autopilot.controllers.speedPid.i,
                truncToDecimal(autopilot.speedPid.i, 3),
              ),
              d: updateArray(
                state.autopilot.controllers.speedPid.d,
                truncToDecimal(autopilot.speedPid.d, 3),
              ),
            },
          },
        },
        model: {
          position: {
            latitude: updateArray(
              state.model.position.latitude,
              truncToDecimal(model.position.latitude, 7),
            ),
            longitude: updateArray(
              state.model.position.longitude,
              truncToDecimal(model.position.longitude, 7),
            ),
            heading: updateArray(
              state.model.position.heading,
              truncToDecimal(model.position.heading * (180.0 / Math.PI), 2),
            ),
          },
        },
        sensors: {
          roll: updateArray(state.sensors.roll, sensors.mrus[0].roll),
          pitch: updateArray(state.sensors.pitch, sensors.mrus[0].pitch),
          gyroHeading: updateArray(state.sensors.gyroHeading, sensors.gyrocompasses[0].heading),
          filteredGyroHeading: updateArray(
            state.sensors.filteredGyroHeading,
            estimated.filteredGyroHeading,
          ),
        },
        referencesystems: {
          speed: updateArray(state.referencesystems.speed, referencesystems.gpses[0].speed),
        },
      };
    case 'STOP_SIMULATION':
      return {
        ...state,

        time: [],

        estimator: {
          alphabeta: {
            position: { latitude: [], longitude: [], heading: [] },
            velocity: { u: [], v: [], r: [] },
          },
        },

        autopilot: {
          controllers: {
            headingPid: {
              total: [], p: [], i: [], d: [],
            },
            speedPid: {
              total: [], p: [], i: [], d: [],
            },
          },
        },

        model: { position: { latitude: [], longitude: [], heading: [] } },

        sensors: {
          roll: [], pitch: [], gyroHeading: [], filteredGyroHeading: [],
        },

        referencesystems: { speed: [] },
      };
    default:
      return state;
  }
}
