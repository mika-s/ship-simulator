import GeneralUtil from '../domain/GeneralUtil';

class GPS {
  static measurePosition(gps, modelLatitude, modelLongitude) {
    const newGps = Object.assign({}, gps);

    const minLatitude = -90.0;
    const maxLatitude = 90.0;
    const minLongitude = -180.0;
    const maxLongitude = 180.0;
    const minNoiseAmplitude = -0.5 * 10e-8;
    const maxNoiseAmplitude = 0.5 * 10e-8;

    // Add measurement noise.
    let newLatitude = modelLatitude +
      GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

    let newLongitude = modelLongitude +
      GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

    // Apply clip limits.
    newLatitude = Math.min(newLatitude, maxLatitude);
    newLatitude = Math.max(newLatitude, minLatitude);

    newLongitude = Math.min(newLongitude, maxLongitude);
    newLongitude = Math.max(newLongitude, minLongitude);

    // Remove unnecessary decimals. Keep 6.
    newLatitude = GeneralUtil.truncToDecimal(newLatitude, 6);
    newLongitude = GeneralUtil.truncToDecimal(newLongitude, 6);

    newGps.latitude = newLatitude;
    newGps.longitude = newLongitude;

    return newGps;
  }
}

export default GPS;
