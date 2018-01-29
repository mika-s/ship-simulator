import { truncToDecimal } from '../../util/general.util';
import { updateArray } from './timeseries.util';

export default function timeseriesReducer(
  state, action, time, estimator,
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
              longitude: updateArray(
                state.estimator.alphabeta.position.longitude,
                truncToDecimal(estimator.position.longitude, 7),
              ),
              latitude: updateArray(
                state.estimator.alphabeta.position.latitude,
                truncToDecimal(estimator.position.latitude, 7),
              ),
              heading: updateArray(
                state.estimator.alphabeta.position.heading,
                truncToDecimal(estimator.position.heading, 2),
              ),
            },
            velocity: {
              u: updateArray(
                state.estimator.alphabeta.velocity.u,
                truncToDecimal(estimator.velocity.u, 1),
              ),
              v: updateArray(
                state.estimator.alphabeta.velocity.v,
                truncToDecimal(estimator.velocity.v, 1),
              ),
              r: updateArray(
                state.estimator.alphabeta.velocity.r,
                truncToDecimal(estimator.velocity.r, 1),
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
            position: {
              longitude: [],
              latitude: [],
              heading: [],
            },
            velocity: {
              u: [],
              v: [],
              r: [],
            },
          },
        },

        model: {
          position: {
            latitude: [],
            longitude: [],
            heading: [],
          },
        },
        sensors: {
          roll: [],
          pitch: [],
        },

        referencesystems: {
          speed: [],
        },
      };
    default:
      return state;
  }
}
