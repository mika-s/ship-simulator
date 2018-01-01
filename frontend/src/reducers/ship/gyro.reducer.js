import GeneralUtil from '../../util/GeneralUtil';

function getHeading(modelHeading) {
  const minHeading = 0.0;
  const maxHeading = 360.0;
  const minNoiseAmplitude = -0.5;
  const maxNoiseAmplitude = 0.5;

  // Add measurement noise.
  let newHeading = modelHeading +
    GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

  // Apply clip limits.
  newHeading = Math.min(newHeading, maxHeading);
  newHeading = Math.max(newHeading, minHeading);

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
