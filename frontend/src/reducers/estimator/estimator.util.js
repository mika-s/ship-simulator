import { wrapTo0To360, unwrapAngle } from '../../util/kinematics.util';

function getHeadingFromGyrocompasses(gyrocompasses) {
  let sum = 0;
  for (let gyroIdx = 0; gyroIdx < gyrocompasses.length; gyroIdx += 1) {
    sum += gyrocompasses[gyroIdx].heading;
  }

  return sum / gyrocompasses.length;
}

function alphabetaFilter(frequency, alphabeta, filteredGyroHeading) {
  const secInMin = 60;
  const dt = 1 / frequency;
  const { alpha, beta } = alphabeta;

  // Unwrap filtered gyro to -∞,∞
  const unwrappedFilteredGyroHeading = unwrapAngle(
    alphabeta.position.heading * (Math.PI / 180.0),
    filteredGyroHeading * (Math.PI / 180.0),
  ) * (180.0 / Math.PI);

  const prevEstimatedHeading = alphabeta.position.heading;
  const prevEstimatedRot = alphabeta.velocity.r / secInMin;

  // prediction step
  const predictedHeading = prevEstimatedHeading + (prevEstimatedRot * dt);
  const predictedRot = prevEstimatedRot;

  // update step
  const residual = unwrappedFilteredGyroHeading - predictedHeading;
  let estimatedRot = predictedRot + ((beta * residual) / dt);
  let estimatedHeading = predictedHeading + (alpha * residual);

  estimatedHeading = wrapTo0To360(estimatedHeading);
  estimatedRot *= secInMin;

  return { estimatedHeading, estimatedRot };
}

export function estimatePositionAndVelocity(frequency, estimator, gpses, gyrocompasses) {
  const filteredGyroHeading = getHeadingFromGyrocompasses(gyrocompasses);
  const { estimatedHeading, estimatedRot }
    = alphabetaFilter(frequency, estimator.alphabeta, filteredGyroHeading);

  const position = {
    latitude: 0.0,
    longitude: 0.0,
    heading: estimatedHeading,
  };

  const velocity = {
    u: 0.0,
    v: 0.0,
    r: estimatedRot,
  };

  return { position, velocity };
}
