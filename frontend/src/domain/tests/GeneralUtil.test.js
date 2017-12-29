import GeneralUtil from '../GeneralUtil';

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

