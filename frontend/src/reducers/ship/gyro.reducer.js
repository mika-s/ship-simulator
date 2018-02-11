import { getRandomBetween, truncToDecimal } from '../../util/general.util';
import { wrapTo0To360 } from '../../util/kinematics.util';

function getHeading(modelHeading) {
  const minNoiseAmplitude = -0.01;
  const maxNoiseAmplitude = 0.01;

  // Add measurement noise.
  let newHeading = modelHeading +
    getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

  // Convert to degrees.
  newHeading *= (180.0 / Math.PI);

  // Wrap.
  newHeading = wrapTo0To360(newHeading);

  // Remove unnecessary decimals. Keep 1.
  newHeading = truncToDecimal(newHeading, 1);

  return newHeading;
}

function getROT(modelRot) {
  const minRot = -100.0 * (Math.PI / 180.0);
  const maxRot = 100.0 * (Math.PI / 180.0);
  const minNoiseAmplitude = -0.001;
  const maxNoiseAmplitude = 0.001;

  // Add measurement noise.
  let newRot = modelRot +
    getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

  // Apply clip limits.
  newRot = Math.min(newRot, maxRot);
  newRot = Math.max(newRot, minRot);

  // Convert to degrees.
  newRot *= (180.0 / Math.PI);

  // Convert to °/min.
  newRot *= 60;

  // Remove unnecessary decimals. Keep 1.
  newRot = truncToDecimal(newRot, 1);

  return newRot;
}

export default function gyroReducer(state, action, modelHeading, modelRot) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        heading: getHeading(modelHeading),
        rot: getROT(modelRot),
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        heading: 0.0,
        rot: 0.0,
      };
    default:
      return state;
  }
}
