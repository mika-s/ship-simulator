import { getRandomBetween, truncToDecimal } from '../../util/general.util';

function getRoll(roll) {
  const minRoll = -20.0;
  const maxRoll = 20.0;
  const minNoiseAmplitude = -0.05;
  const maxNoiseAmplitude = 0.05;

  // Add measurement noise.
  let newRoll = roll + getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

  // Apply clip limits.
  newRoll = Math.min(newRoll, maxRoll);
  newRoll = Math.max(newRoll, minRoll);

  // Remove unnecessary decimals. Keep 2.
  newRoll = truncToDecimal(newRoll, 2);

  return newRoll;
}

function getPitch(pitch) {
  const minPitch = -15.0;
  const maxPitch = 15.0;
  const minNoiseAmplitude = -0.05;
  const maxNoiseAmplitude = 0.05;

  let newPitch = pitch + getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

  // Apply clip limits.
  newPitch = Math.min(newPitch, maxPitch);
  newPitch = Math.max(newPitch, minPitch);

  // Remove unnecessary decimals. Keep 2.
  newPitch = truncToDecimal(newPitch, 2);

  return newPitch;
}

/**
* The reducer for a single mru.
* @param {Object}    state             The state object (rootstate.ship.mrus[i]).
* @param {Object}    action            The action object.
* @param {number}    modelRoll         The roll from the vessel model.
* @param {number}    modelPitch        The pitch from the vessel model.
* @returns {Object} The mru section updated.
*/
export default function mruReducer(state, action, modelRoll, modelPitch) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        roll: getRoll(modelRoll),
        pitch: getPitch(modelPitch),
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        roll: 0.0,
        pitch: 0.0,
      };
    default:
      return state;
  }
}
