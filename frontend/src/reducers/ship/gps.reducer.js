import GeneralUtil from '../../util/GeneralUtil';

function getPosition(model) {
  const minLatitude = -90.0;
  const maxLatitude = 90.0;
  const minLongitude = -180.0;
  const maxLongitude = 180.0;
  const minNoiseAmplitude = -0.5 * 10e-8;
  const maxNoiseAmplitude = 0.5 * 10e-8;

  // Add measurement noise.
  let newLatitude = model.latitude +
    GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

  let newLongitude = model.longitude +
    GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

  // Apply clip limits.
  newLatitude = Math.min(newLatitude, maxLatitude);
  newLatitude = Math.max(newLatitude, minLatitude);

  newLongitude = Math.min(newLongitude, maxLongitude);
  newLongitude = Math.max(newLongitude, minLongitude);

  // Remove unnecessary decimals. Keep 6.
  newLatitude = GeneralUtil.truncToDecimal(newLatitude, 6);
  newLongitude = GeneralUtil.truncToDecimal(newLongitude, 6);

  return {
    newLatitude,
    newLongitude,
  };
}

export default function gpsReducer(state, action, model) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        position: getPosition(model),
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        position: {
          latitude: 0.0,
          longitude: 0.0,
        },
      };
    default:
      return state;
  }
}
