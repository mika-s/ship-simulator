import GeneralUtil from '../util/general.util';

it('truncToDecimal(20.12345, 2) = 20.12', () => {
  const truncatedNumber = GeneralUtil.truncToDecimal(20.12345, 2);
  expect(truncatedNumber).toEqual(20.12);
});

it('truncToDecimal(-20.12345, 2) = 20.12', () => {
  const truncatedNumber = GeneralUtil.truncToDecimal(-20.12345, 2);
  expect(truncatedNumber).toEqual(-20.12);
});

it('truncToDecimal(20.12345, 0) = 20', () => {
  const truncatedNumber = GeneralUtil.truncToDecimal(20.12345, 0);
  expect(truncatedNumber).toEqual(20);
});

it('truncToDecimal(20.12345, 1) = 20.1', () => {
  const truncatedNumber = GeneralUtil.truncToDecimal(20.12345, 1);
  expect(truncatedNumber).toEqual(20.1);
});

it('truncToDecimal(-1.12345, 3) = 20.1', () => {
  const truncatedNumber = GeneralUtil.truncToDecimal(-1.12345, 3);
  expect(truncatedNumber).toEqual(-1.123);
});

it('truncToDecimal(-2.12345, 1) = 20.1', () => {
  const truncatedNumber = GeneralUtil.truncToDecimal(-2.12345, 1);
  expect(truncatedNumber).toEqual(-2.1);
});

it('getRandomBetween(-10, 10) returns a number between -10 and 10', () => {
  const randomNumber = GeneralUtil.getRandomBetween(-10, 10);
  expect(typeof randomNumber).toEqual('number');
  expect(randomNumber).toBeGreaterThanOrEqual(-10);
  expect(randomNumber).toBeLessThan(10);
});

it('getRandomBetween(10, 20) returns a number between 10 and 20', () => {
  const randomNumber = GeneralUtil.getRandomBetween(10, 20);
  expect(typeof randomNumber).toEqual('number');
  expect(randomNumber).toBeGreaterThanOrEqual(10);
  expect(randomNumber).toBeLessThan(20);
});

it('mpsInKnots(1) converts m/s to knots', () => {
  const knots = GeneralUtil.mpsInKnots(1);
  expect(knots).toEqual(1.94384);
});

it('mpsInKnots(2) converts m/s to knots', () => {
  const knots = GeneralUtil.mpsInKnots(2);
  expect(knots).toEqual(3.88768);
});

it('knotsInMps(1) converts knots to m/s', () => {
  const mps = GeneralUtil.knotsInMps(1);
  expect(mps).toEqual(0.514444);
});

it('knotsInMps(2) converts knots to m/s', () => {
  const mps = GeneralUtil.knotsInMps(2);
  expect(mps).toEqual(1.028888);
});

