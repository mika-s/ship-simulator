import { truncToDecimal } from '../../util/general.util';

function updateArray(oldArray, newValue) {
  const secondToSave = 60;

  const newArray = oldArray.slice();

  if (newArray.length < secondToSave) {
    newArray.push(newValue);
  } else {
    newArray.shift();
    newArray.push(newValue);
  }

  return newArray;
}

export default function timeseriesReducer(state, action, time, model, sensors, referencesystems) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        time: updateArray(state.time, time + 1),

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
