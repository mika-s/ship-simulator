/**
* Truncate to a given number of decimals.
* @param {number} number    The number to truncate.
* @param {number} decimals  Number of decimals.
* @returns {number} The value of the given number, truncated to given number of decimals.
*/
export function truncToDecimal(number, decimals) {
  return Math.trunc(number * (10 ** decimals)) / (10 ** decimals);
}

/**
* Get a random number between min and max.
* Can be equal min, but not max: [min, max).
* @param {number} min    Minimum value.
* @param {number} max    Maximum value.
* @returns {number} A random number between min and max.
*/
export function getRandomBetween(min, max) {
  return (Math.random() * (max - min)) + min;
}

/**
* Find the mean value of an array of numbers.
* @param {number[]} array    Array of numbers to find the mean of.
* @returns {number} The mean value of the array.
*/
export function meanOfArray(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i += 1) {
    sum += array[i];
  }

  const mean = sum / array.length;

  return mean;
}

/**
* Find the circular mean of an array of numbers.
* https://en.wikipedia.org/wiki/Mean_of_circular_quantities
* @param {number[]} array    Array of numbers to find the mean of.
*                            Angles should be in rad from -π to π.
* @returns {number} The circular mean value of the array.
*/
export function circularMeanOfArray(angles) {
  let x = 0;
  let y = 0;

  for (let aIdx = 0; aIdx < angles.length; aIdx += 1) {
    x += Math.cos(angles[aIdx]);
    y += Math.sin(angles[aIdx]);
  }

  const angle = Math.atan2(y, x);

  return angle;
}

/**
* Convert a number in m/s to knots.
* @param {number} mps    Number in m/s.
* @returns {number} Number in knots.
*/
export function mpsInKnots(mps) {
  return 1.94384 * mps;
}

/**
* Convert a number in knots to m/s.
* @param {number} knots  Number in knots.
* @returns {number} Number in m/s.
*/
export function knotsInMps(knots) {
  return 0.514444 * knots;
}
