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

  const prevEstimatedHeading = alphabeta.position.heading;
  const prevEstimatedRot = alphabeta.velocity.r / secInMin;

  // console.log(prevEstimatedHeading, prevEstimatedRot);

  // prediction step
  const predictedHeading = prevEstimatedHeading + (prevEstimatedRot * dt);
  const predictedRot = prevEstimatedRot;

  // console.log(predictedHeading, predictedRot);

  // update step
  const residual = filteredGyroHeading - predictedHeading;
  let estimatedRot = predictedRot + ((beta * residual) / dt);
  const estimatedHeading = predictedHeading + (alpha * residual);

  // convert ROT to °/min
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
