function getHeadingFromGyrocompasses(gyrocompasses) {
  let sum = 0;
  for (let gyroIdx = 0; gyroIdx < gyrocompasses.length; gyroIdx += 1) {
    sum += gyrocompasses[gyroIdx].heading;
  }

  return sum / gyrocompasses.length;
}

function alphabetaFilter(alphabeta, filteredGyroHeading) {
  const dt = 1;
  const alpha = 1;
  const beta = 1;
  const prevEstimatedHeading = alphabeta.position.heading;
  const prevEstimatedRot = alphabeta.velocity.r;

  // prediction step
  const predictedHeading = prevEstimatedHeading + (prevEstimatedRot * dt);
  const predictedRot = prevEstimatedRot;

  // update step
  const residual = filteredGyroHeading - predictedHeading;
  let estimatedRot = predictedRot + ((beta * (residual)) / dt);
  const estimatedHeading = predictedHeading + (alpha * residual);

  // convert ROT to °/min
  estimatedRot *= 60;

  return { estimatedHeading, estimatedRot };
}

export function estimatePositionAndVelocity(estimator, gpses, gyrocompasses) {
  const filteredGyroHeading = getHeadingFromGyrocompasses(gyrocompasses);
  const { estimatedHeading, estimatedRot }
    = alphabetaFilter(estimator.alphabeta, filteredGyroHeading);

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
