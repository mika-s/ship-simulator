import { LatLonSpherical } from 'geodesy';
import {
  transformBODYToNED, transformNEDToBODY, wrapTo0To360, unwrapAngle,
} from '../../util/kinematics.util';

const {
  sin, cos, sqrt, atan2, PI,
} = Math;

/**
* Get the position of the vessel in meters, given degrees.
* @param {Object} positionInDegrees   The position in degrees.
* @returns {Object} The position of the vessel in meters.
*/
function getPositionInMeters(positionInDegrees) {
  const geoCenter = new LatLonSpherical(0.0, 0.0);
  const geoPosition =
    new LatLonSpherical(positionInDegrees.latitude, positionInDegrees.longitude);

  const distance = geoPosition.distanceTo(geoCenter);
  const bearing = geoCenter.bearingTo(geoPosition) * (PI / 180.0);

  const positionInMeters = {
    latitude: distance * cos(bearing),
    longitude: distance * sin(bearing),
  };

  return positionInMeters;
}

/**
* Get the position of the vessel in degrees, given meters.
* @param {Object} positionInMeters   The position in meters.
* @returns {Object} The position of the vessel in degrees.
*/
function getPositionInDegrees(positionInMeters) {
  const geoCenter = new LatLonSpherical(0.0, 0.0);

  const distance = sqrt((positionInMeters.latitude ** 2) + (positionInMeters.longitude ** 2));
  const bearing = atan2(positionInMeters.longitude, positionInMeters.latitude) * (180.0 / PI);

  const positionInDegrees = geoCenter.destinationPoint(distance, bearing);

  return {
    latitude: positionInDegrees.lat,
    longitude: positionInDegrees.lon,
  };
}

/**
* Estimate x and xdot using an alphabeta filter.
* @param {number} frequency   - The working frequency of the system.
* @param {number} alpha       - Alpha parameter of the filter.
* @param {number} beta        - Beta parameter of the filter.
* @param {number} x           - The previous x value.
* @param {number} xdot        - The previous xdot value.
* @param {number} measuredX   - The measured x value.
* @param {boolean} isHeading  - Whether the estimated x is a heading or not.
* @returns {Object} An object containing estimated x and xdot.
*/
function alphabetaFilter(frequency, alpha, beta, x, xdot, measuredX, isHeading) {
  const secInMin = isHeading ? 60 : 1;
  const dt = 1 / frequency;

  const unwrappedMeasuredX = isHeading ? unwrapAngle(
    x * (PI / 180.0),
    measuredX * (PI / 180.0),
  ) * (180.0 / PI) : measuredX;

  const prevEstimatedX = x;
  const prevEstimatedXdot = xdot / secInMin;

  // prediction step
  const predictedX = prevEstimatedX + (prevEstimatedXdot * dt);
  const predictedXdot = prevEstimatedXdot;

  // update step
  const residual = unwrappedMeasuredX - predictedX;
  let estimatedXdot = predictedXdot + ((beta * residual) / dt);
  let estimatedX = predictedX + (alpha * residual);

  if (isHeading) {
    estimatedX = wrapTo0To360(estimatedX);
    estimatedXdot *= secInMin;
  }

  return { estimatedX, estimatedXdot };
}

/**
* Estimate position, velocity and acceleration for heading using an alphabeta filter.
* @param {number} frequency            - The working frequency of the system.
* @param {Object} estimator            - The estimator object.
* @param {number} filteredGyroHeading  - The filtered heading from gyrocompasses.
* @returns {Object} An object containing estimated position, velocity and acceleration.
*/
export function estimateForHeading(frequency, estimator, filteredGyroHeading) {
  const { estimatedX: estimatedHeading, estimatedXdot: estimatedRot } = alphabetaFilter(
    frequency,
    estimator.alphabeta.alpha.heading,
    estimator.alphabeta.beta.heading,
    estimator.alphabeta.position.heading,
    estimator.alphabeta.velocity.r,
    filteredGyroHeading,
    true,
  );

  const position = { heading: estimatedHeading };
  const velocity = { r: estimatedRot };
  const acceleration = { rd: 0.0 };

  return { position, velocity, acceleration };
}

/**
* Estimate position, velocity and acceleration for latitude and longitude using an alphabeta filter.
* @param {number} frequency            - The working frequency of the system.
* @param {Object} estimator            - The estimator object.
* @param {Object} filteredGpsPosition  - An filtered position from GPSes.
* @param {number} heading              - The vessel's heading.
* @returns {Object} An object containing estimated position, velocity and acceleration.
*/
export function estimateForLatitudeAndLongitude(
  frequency, estimator,
  filteredGpsPosition, heading,
) {
  const filteredGpsPositionInMeters = getPositionInMeters(filteredGpsPosition);

  const filteredGpsPositionInMetersInBody = transformNEDToBODY({
    latitude: filteredGpsPositionInMeters.latitude,
    longitude: filteredGpsPositionInMeters.longitude,
    heading: heading * (PI / 180.0),
  });

  const positionInMeters = getPositionInMeters(estimator.alphabeta.position);

  const positionInMetersInBody = transformNEDToBODY({
    latitude: positionInMeters.latitude,
    longitude: positionInMeters.longitude,
    heading: heading * (PI / 180.0),
  });

  // Run latitude and longitude alphabeta filter in meters in BODY.
  const {
    estimatedX: estimatedSurge, estimatedXdot: estimatedLatitudeVelocity,
  } = alphabetaFilter(
    frequency,
    estimator.alphabeta.alpha.latitude,
    estimator.alphabeta.beta.latitude,
    positionInMetersInBody.surge,
    estimator.alphabeta.velocity.u,
    filteredGpsPositionInMetersInBody.surge,
    false,
  );

  const {
    estimatedX: estimatedSway, estimatedXdot: estimatedLongitudeVelocity,
  } = alphabetaFilter(
    frequency,
    estimator.alphabeta.alpha.longitude,
    estimator.alphabeta.beta.longitude,
    positionInMetersInBody.sway,
    estimator.alphabeta.velocity.v,
    filteredGpsPositionInMetersInBody.sway,
    false,
  );

  const positionInMetersInNed = transformBODYToNED({
    surge: estimatedSurge,
    sway: estimatedSway,
    heading: heading * (PI / 180.0),
  });

  const positionInNed = getPositionInDegrees(positionInMetersInNed);

  const position = {
    latitude: positionInNed.latitude,
    longitude: positionInNed.longitude,
  };

  const velocity = {
    u: estimatedLatitudeVelocity,
    v: estimatedLongitudeVelocity,
  };

  const acceleration = { ud: 0.0, vd: 0.0 };

  return { position, velocity, acceleration };
}
