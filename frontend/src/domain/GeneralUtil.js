class GeneralUtil {
  /**
  * Get a random number between min and max.
  * @param {number} min    - Minimum value.
  * @param {number} max    - Maximum value.
  * @returns {number}      - A random number between min and max.
  */
  static getRandomBetween(min, max) {
    return (Math.random() * (max - min)) + min;
  }

  /**
  * Convert a number in m/s to knots.
  * @param {number} mps    - Number in m/s.
  * @returns {number}      - Number in knots.
  */
  static mpsInKnots(mps) {
    return 1.94384 * mps;
  }

  /**
  * Convert a number in knots to m/s.
  * @param {number} knots  - Number in knots.
  * @returns {number}      - Number in m/s.
  */
  static knotsInMps(knots) {
    return 0.514444 * knots;
  }
}

export default GeneralUtil;
