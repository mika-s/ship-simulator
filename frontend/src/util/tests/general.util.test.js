import { truncToDecimal, roundToDecimal, getRandomBetween, meanOfArray, circularMeanOfArray, mpsInKnots, knotsInMps } from '../general.util';

it('truncToDecimal(20.12345, 2) = 20.12', () => {
  const truncatedNumber = truncToDecimal(20.12345, 2);
  expect(truncatedNumber).toEqual(20.12);
});

it('truncToDecimal(-20.12345, 2) = -20.12', () => {
  const truncatedNumber = truncToDecimal(-20.12345, 2);
  expect(truncatedNumber).toEqual(-20.12);
});

it('truncToDecimal(20.12345, 0) = 20', () => {
  const truncatedNumber = truncToDecimal(20.12345, 0);
  expect(truncatedNumber).toEqual(20);
});

it('truncToDecimal(20.12345, 1) = 20.1', () => {
  const truncatedNumber = truncToDecimal(20.12345, 1);
  expect(truncatedNumber).toEqual(20.1);
});

it('truncToDecimal(-1.12345, 3) = -1.123', () => {
  const truncatedNumber = truncToDecimal(-1.12345, 3);
  expect(truncatedNumber).toEqual(-1.123);
});

it('truncToDecimal(-2.12345, 1) = -2.1', () => {
  const truncatedNumber = truncToDecimal(-2.12345, 1);
  expect(truncatedNumber).toEqual(-2.1);
});

it('roundToDecimal(20.12345, 2) = 20.12', () => {
  const roundedNumber = roundToDecimal(20.12345, 2);
  expect(roundedNumber).toEqual(20.12);
});

it('roundToDecimal(-20.12345, 2) = -20.12', () => {
  const roundedNumber = roundToDecimal(-20.12345, 2);
  expect(roundedNumber).toEqual(-20.12);
});

it('roundToDecimal(20.12345, 0) = 20', () => {
  const roundedNumber = roundToDecimal(20.12345, 0);
  expect(roundedNumber).toEqual(20);
});

it('roundToDecimal(20.12345, 1) = 20.1', () => {
  const roundedNumber = roundToDecimal(20.12345, 1);
  expect(roundedNumber).toEqual(20.1);
});

it('roundToDecimal(-1.12345, 3) = -1.123', () => {
  const roundedNumber = roundToDecimal(-1.12345, 3);
  expect(roundedNumber).toEqual(-1.123);
});

it('roundToDecimal(-2.12345, 1) = -2.1', () => {
  const roundedNumber = roundToDecimal(-2.12345, 1);
  expect(roundedNumber).toEqual(-2.1);
});

it('roundToDecimal(2.98, 0) = -2.1', () => {
  const roundedNumber = roundToDecimal(2.98, 0);
  expect(roundedNumber).toEqual(3);
});

it('roundToDecimal(2.88, 1) = 2.9', () => {
  const roundedNumber = roundToDecimal(2.88, 1);
  expect(roundedNumber).toEqual(2.9);
});

it('getRandomBetween(-10, 10) returns a number between -10 and 10', () => {
  const randomNumber = getRandomBetween(-10, 10);
  expect(typeof randomNumber).toEqual('number');
  expect(randomNumber).toBeGreaterThanOrEqual(-10);
  expect(randomNumber).toBeLessThan(10);
});

it('getRandomBetween(10, 20) returns a number between 10 and 20', () => {
  const randomNumber = getRandomBetween(10, 20);
  expect(typeof randomNumber).toEqual('number');
  expect(randomNumber).toBeGreaterThanOrEqual(10);
  expect(randomNumber).toBeLessThan(20);
});

it('meanOfArray([10, 20, 30]) returns 20', () => {
  const array = [10, 20, 30];
  const mean = meanOfArray(array);
  expect(typeof mean).toEqual('number');
  expect(mean).toEqual(20);
});

it('meanOfArray([0, 0]) returns 0', () => {
  const array = [0, 0];
  const mean = meanOfArray(array);
  expect(typeof mean).toEqual('number');
  expect(mean).toEqual(0);
});

it('meanOfArray([0, 0, 15]) returns 5', () => {
  const array = [0, 0, 15];
  const mean = meanOfArray(array);
  expect(typeof mean).toEqual('number');
  expect(mean).toEqual(5);
});

it('meanOfArray([0, 0, -15]) returns -5', () => {
  const array = [0, 0, -15];
  const mean = meanOfArray(array);
  expect(typeof mean).toEqual('number');
  expect(mean).toEqual(-5);
});

it('circularMeanOfArray([0, 0, -0.261799]) returns -0.0872', () => {
  const array = [0, 0, -0.261799];
  const mean = circularMeanOfArray(array);
  expect(typeof mean).toEqual('number');
  expect(mean).toBeCloseTo(-0.0872);
});

it('circularMeanOfArray([-0.261799, 0, -0.261799]) returns 0', () => {
  const array = [-0.261799, 0, 0.261799];
  const mean = circularMeanOfArray(array);
  expect(typeof mean).toEqual('number');
  expect(mean).toEqual(0);
});

it('circularMeanOfArray([-Math.PI / 2, 0, Math.PI / 2]) returns 0', () => {
  const array = [-Math.PI / 2, 0, Math.PI / 2];
  const mean = circularMeanOfArray(array);
  expect(typeof mean).toEqual('number');
  expect(mean).toEqual(0);
});

it('circularMeanOfArray([-2.967, Math.PI, 2.967]) returns Math.PI ', () => {
  const array = [-2.967, Math.PI, 2.967];
  const mean = circularMeanOfArray(array);
  expect(typeof mean).toEqual('number');
  expect(mean).toEqual(Math.PI);
});

it('circularMeanOfArray([0.15708, 0.174533, 0.191986]) returns 0.174533', () => {
  const array = [0.15708, 0.174533, 0.191986];
  const mean = circularMeanOfArray(array);
  expect(typeof mean).toEqual('number');
  expect(mean).toEqual(0.174533);
});

it('mpsInKnots(1) converts m/s to knots', () => {
  const knots = mpsInKnots(1);
  expect(knots).toEqual(1.94384);
});

it('mpsInKnots(2) converts m/s to knots', () => {
  const knots = mpsInKnots(2);
  expect(knots).toEqual(3.88768);
});

it('knotsInMps(1) converts knots to m/s', () => {
  const mps = knotsInMps(1);
  expect(mps).toEqual(0.514444);
});

it('knotsInMps(2) converts knots to m/s', () => {
  const mps = knotsInMps(2);
  expect(mps).toEqual(1.028888);
});
