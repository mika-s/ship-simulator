import { getRandomBetween, truncToDecimal } from '../../util/general.util';

/* function getRelativeSpeedAndDirection(modelSpeed, modelDirection, vesselSpeed, vesselHeading) {
  let x = modelSpeed * Math.cos((
    modelDirection - vesselHeading) * (Math.PI / 180.0));

  let y = modelSpeed * Math.sin((
    modelDirection - vesselHeading) * (Math.PI / 180.0));

  x -= vesselSpeed.u;
  y -= vesselSpeed.v;

  return {
    speed: Math.sqrt((x ** 2) + (y ** 2)),
    direction: Math.atan2(y, x) * (180.0 / Math.PI),
  };
} */

function getSpeed(modelSpeed) {
  const minSpeed = 0.0;
  const maxSpeed = 50.0;
  const minNoiseAmplitude = -0.5;
  const maxNoiseAmplitude = 0.5;

  /* const relative = getRelativeSpeedAndDirection(
    modelSpeed, modelDirection,
    vesselSpeed, vesselHeading,
  ); */

  // Add measurement noise.
  let newSpeed = modelSpeed +
    getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

  // Apply clip limits.
  newSpeed = Math.min(newSpeed, maxSpeed);
  newSpeed = Math.max(newSpeed, minSpeed);

  // Remove unnecessary decimals. Keep 2.
  newSpeed = truncToDecimal(newSpeed, 2);

  return newSpeed;
}

function getDirection(modelSpeed, modelDirection) {
  const minDirection = 0.0;
  const maxDirection = 360.0;
  const minNoiseAmplitude = -0.5;
  const maxNoiseAmplitude = 0.5;

  /* const relative = getRelativeSpeedAndDirection(
    modelSpeed, modelDirection,
    vesselSpeed, vesselHeading,
  ); */

  // Add measurement noise.
  let newDirection = modelDirection +
    getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

  // Apply clip limits.
  newDirection = Math.min(newDirection, maxDirection);
  newDirection = Math.max(newDirection, minDirection);

  // Remove unnecessary decimals. Keep 2.
  newDirection = truncToDecimal(newDirection, 2);

  return newDirection;
}

/**
* The reducer for a single wind sensor.
* @param {Object}    state       The state object (rootstate.ship.windsensors[i]).
* @param {Object}    action      The action object.
* @param {Object}    model       The vessel model object.
* @param {Object}    envWind     The wind environment object.
* @returns {Object} The wind sensor updated.
*/
export default function windsensorReducer(state, action, model, envWind) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,

        speed: getSpeed(
          envWind.speed, envWind.direction,
          model.velocity, model.position.heading,
        ),

        direction: getDirection(
          envWind.speed, envWind.direction,
          model.velocity, model.position.heading,
        ),
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        speed: 0.0,
        direction: 0.0,
      };
    default:
      return state;
  }
}
