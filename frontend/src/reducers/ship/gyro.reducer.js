import GeneralUtil from '../../util/general.util';

function getHeading(modelHeading) {
  const minHeading = 0.0;
  const maxHeading = 2 * Math.PI;
  const minNoiseAmplitude = -0.01;
  const maxNoiseAmplitude = 0.01;

  // Add measurement noise.
  let newHeading = modelHeading +
    GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

  // Apply clip limits.
  newHeading = Math.min(newHeading, maxHeading);
  newHeading = Math.max(newHeading, minHeading);

  // Convert to degrees.
  newHeading *= (180.0 / Math.PI);

  // Remove unnecessary decimals. Keep 1.
  newHeading = GeneralUtil.truncToDecimal(newHeading, 1);

  return newHeading;
}

export default function gyroReducer(state, action, modelHeading) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        heading: getHeading(modelHeading),
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        heading: 0.0,
      };
    default:
      return state;
  }
}
