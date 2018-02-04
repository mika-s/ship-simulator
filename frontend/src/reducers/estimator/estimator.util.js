import { LatLonSpherical } from 'geodesy';
import { transformBODYToNED, transformNEDToBODY, wrapTo0To360, unwrapAngle } from '../../util/kinematics.util';
import { meanOfArray } from '../../util/general.util';

const {
  sin, cos, sqrt, atan2, PI,
} = Math;

function getHeadingFromGyrocompasses(gyrocompasses) {
  const headings = [];

  for (let gyroIdx = 0; gyroIdx < gyrocompasses.length; gyroIdx += 1) {
    headings.push(gyrocompasses[gyroIdx].heading);
  }

  return meanOfArray(headings);
}

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

function getPositionInNed(positionInMeters) {
  const geoCenter = new LatLonSpherical(0.0, 0.0);

  const distance = sqrt((positionInMeters.latitude ** 2) + (positionInMeters.longitude ** 2));
  const bearing = atan2(positionInMeters.longitude, positionInMeters.latitude) * (180.0 / PI);

  const positionInDegrees = geoCenter.destinationPoint(distance, bearing);

  return {
    latitude: positionInDegrees.lat,
    longitude: positionInDegrees.lon,
  };
}

function alphabetaFilter(frequency, alpha, beta, x, xdot, measuredX, isHeading) {
  const secInMin = isHeading ? 60 : 1;
  const dt = 1 / frequency;

  const unwrappedMeasuredX = isHeading ? unwrapAngle(
    x * (PI / 180.0),
    measuredX * (PI / 180.0),
  ) * (180.0 / PI) : measuredX;

  const prevEstimatedX = x;
  const prevEstimatedXdot = x / secInMin;

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
  const filteredGpsPositionInMeters = getPositionInMeters(filteredGpsPosition);

  const { estimatedX: estimatedHeading, estimatedXdot: estimatedRot } = alphabetaFilter(
    frequency,
    estimator.alphabeta.alpha.heading,
    estimator.alphabeta.beta.heading,
    estimator.alphabeta.position.heading,
    estimator.alphabeta.velocity.r,
    filteredGyroHeading,
    true,
  );

  const filteredGpsPositionInMetersInBody = transformNEDToBODY({
    latitude: filteredGpsPositionInMeters.latitude,
    longitude: filteredGpsPositionInMeters.longitude,
    heading: estimatedHeading * (PI / 180.0),
  });

  const positionInMeters = getPositionInMeters(estimator.alphabeta.position);

  const positionInMetersInBody = transformNEDToBODY({
    latitude: positionInMeters.latitude,
    longitude: positionInMeters.longitude,
    heading: estimatedHeading * (PI / 180.0),
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
    heading: estimatedHeading * (PI / 180.0),
  });

  const positionInNed = getPositionInNed(positionInMetersInNed);

  const position = {
    latitude: positionInNed.latitude,
    longitude: positionInNed.longitude,
    heading: estimatedHeading,
  };

  const velocity = {
    u: estimatedLatitudeVelocity,
    v: estimatedLongitudeVelocity,
    r: estimatedRot,
  };

  const acceleration = {
    ud: 0.0,
    vd: 0.0,
    rd: 0.0,
  };

  // console.log(position, velocity, acceleration);

  return { position, velocity, acceleration };
}
