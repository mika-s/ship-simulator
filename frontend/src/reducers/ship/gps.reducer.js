import { getRandomBetween, truncToDecimal } from '../../util/general.util';

function getPosition(position) {
  const minLatitude = -90.0;
  const maxLatitude = 90.0;
  const minLongitude = -180.0;
  const maxLongitude = 180.0;
  const minNoiseAmplitude = -0.4 * 10e-8;
  const maxNoiseAmplitude = 0.4 * 10e-8;

  // Add measurement noise.
  let newLatitude = position.latitude +
    getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

  let newLongitude = position.longitude +
    getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

  // Apply clip limits.
  newLatitude = Math.min(newLatitude, maxLatitude);
  newLatitude = Math.max(newLatitude, minLatitude);

  newLongitude = Math.min(newLongitude, maxLongitude);
  newLongitude = Math.max(newLongitude, minLongitude);

  // Remove unnecessary decimals. Keep 8.
  newLatitude = truncToDecimal(newLatitude, 8);
  newLongitude = truncToDecimal(newLongitude, 8);

  return {
    latitude: newLatitude,
    longitude: newLongitude,
  };
}

function getSpeed(velocity) {
  const minSpeed = 0.0;
  const maxSpeed = 25.0;
  const minNoiseAmplitude = -1.0 * 10e-2;
  const maxNoiseAmplitude = 1.0 * 10e-2;

  // Add measurement noise.
  let newSpeed = velocity.u +
    getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

  // Apply clip limits.
  newSpeed = Math.min(newSpeed, maxSpeed);
  newSpeed = Math.max(newSpeed, minSpeed);

  // Remove unnecessary decimals. Keep 2.
  newSpeed = truncToDecimal(newSpeed, 2);

  return newSpeed;
}

function getDirection(position, velocity) {
  const forwardSpeed = velocity.u !== 0 ? velocity.u : 0.001;
  const minDirection = 0.0;
  const maxDirection = 360.0;
  const minNoiseAmplitude = (-0.5 * 10e-0) / forwardSpeed;
  const maxNoiseAmplitude = (0.5 * 10e-0) / forwardSpeed;

  // Add measurement noise.
  let newDirection = (position.heading * (180.0 / Math.PI)) +
    getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

  // Apply clip limits.
  newDirection = Math.min(newDirection, maxDirection);
  newDirection = Math.max(newDirection, minDirection);

  // Remove unnecessary decimals. Keep 2.
  newDirection = truncToDecimal(newDirection, 2);

  return newDirection;
}

/**
* The reducer for a single gps.
* @param {Object}    state        The state object (rootstate.ship.gpses[i]).
* @param {Object}    action       The action object.
* @param {Object}    model        The vessel model object.
* @returns {Object} The gps updated.
*/
export default function gpsReducer(state, action, model) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        position: getPosition(model.position),
        speed: getSpeed(model.velocity),
        direction: getDirection(model.position, model.velocity),
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        position: {
          latitude: 0.0,
          longitude: 0.0,
        },
        speed: 0.0,
        direction: 0.0,
      };
    default:
      return state;
  }
}
