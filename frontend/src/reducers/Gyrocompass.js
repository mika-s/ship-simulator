import GeneralUtil from '../domain/GeneralUtil';

class Gyrocompass {
  static calculateHeading(gyrocompass, modelHeading) {
    const newGyrocompass = Object.assign({}, gyrocompass);

    const minHeading = 0.0;
    const maxHeading = 360.0;
    const minNoiseAmplitude = -0.5;
    const maxNoiseAmplitude = 0.5;

    // Add measurement noise.
    let newHeading = modelHeading +
      GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

    // Apply clip limits.
    newHeading = Math.min(newHeading, maxHeading);
    newHeading = Math.max(newHeading, minHeading);

    // Remove unnecessary decimals. Keep 1.
    newHeading = GeneralUtil.truncToDecimal(newHeading, 1);

    newGyrocompass.heading = newHeading;

    return newGyrocompass;
  }

  static resetGyrocompass(gyrocompass) {
    const newGyrocompass = Object.assign({}, gyrocompass);

    newGyrocompass.heading = 0.0;

    return newGyrocompass;
  }
}

export default Gyrocompass;
