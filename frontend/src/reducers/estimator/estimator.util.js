import { meanOfArray } from '../../util/general.util';
import { estimateForHeading, estimateForLatitudeAndLongitude } from './alphabeta';

/**
* Get the filtered heading from the Gyrocompasses.
* @param {Object[]} gyrocompasses   - An array of Gyrocompass objects.
* @returns {number} The filtered heading.
*/
function getHeadingFromGyrocompasses(gyrocompasses) {
  const headings = [];

  for (let gyroIdx = 0; gyroIdx < gyrocompasses.length; gyroIdx += 1) {
    headings.push(gyrocompasses[gyroIdx].heading);
  }

  return meanOfArray(headings);
}

/**
* Get the filtered position from the GPSes.
* @param {Object[]} gpses          - An array of GPS objects.
* @returns {Object} Object with the filtered position.
*/
function getPositionFromGpses(gpses) {
  const latitudes = [];
  const longitudes = [];

  for (let gpsIdx = 0; gpsIdx < gpses.length; gpsIdx += 1) {
    latitudes.push(gpses[gpsIdx].position.latitude);
    longitudes.push(gpses[gpsIdx].position.longitude);
  }

  return {
    latitude: meanOfArray(latitudes),
    longitude: meanOfArray(longitudes),
  };
}

/**
* Estimate the position and velocity of the vessel.
* @param {number} frequency        - The working frequency of the system.
* @param {Object} estimator        - The estimator object.
* @param {Object[]} gpses          - An array of GPS objects.
* @param {Object[]} gyrocompasses  - An array of Gyrocompass objects.
* @returns {Object} Object with the estimated position, velocity and acceleration.
*/
export function estimatePositionAndVelocity(frequency, estimator, gpses, gyrocompasses) {
  const filteredGyroHeading = getHeadingFromGyrocompasses(gyrocompasses);
  const filteredGpsPosition = getPositionFromGpses(gpses, estimator.alphabeta.heading);
  let heading;
  let latitudeAndLongitude;

  switch (estimator.estimatorChoice.heading) {
    case 'alphabeta':
      heading = estimateForHeading(frequency, estimator, filteredGyroHeading);
      break;
    default:
      throw new Error('Invalid estimator choice for heading.');
  }

  switch (estimator.estimatorChoice.latitudeAndLongitude) {
    case 'alphabeta':
      latitudeAndLongitude = estimateForLatitudeAndLongitude(
        frequency, estimator, filteredGpsPosition,
        heading.position.heading,
      );
      break;
    default:
      throw new Error('Invalid estimator choice for heading.');
  }

  const position = Object.assign({}, latitudeAndLongitude.position, heading.position);
  const velocity = Object.assign({}, latitudeAndLongitude.velocity, heading.velocity);
  const acceleration = Object.assign({}, latitudeAndLongitude.acceleration, heading.acceleration);

  return { position, velocity, acceleration };
}
