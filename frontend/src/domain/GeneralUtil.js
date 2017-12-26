class GeneralUtil {
  static getRandomBetween(min, max) {
    return (Math.random() * (max - min)) + min;
  }

  static mpsInKnots(mps) {
    return 1.94384 * mps;
  }

  static knotsInMps(knots) {
    return 0.514444 * knots;
  }
}

export default GeneralUtil;
