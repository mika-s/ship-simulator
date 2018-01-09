import UiThruster from '../uithruster';

/* eslint no-unused-vars: "off" */

it('should be created successfully with correct parameters', () => {
  const data = { number: 1 };
  const newUiThruster = new UiThruster(data);

  expect(newUiThruster).toEqual({ number: 1, demand: { rpm: 0.0, pitch: 0.0, azimuth: 0.0 } });
});

it('should be not created with too small number', () => {
  const data = { number: -1 };

  expect(() => { const newUiThruster = new UiThruster(data); }).toThrow();
});

it('should be not created with too large number', () => {
  const data = { number: 300 };

  expect(() => { const newUiThruster = new UiThruster(data); }).toThrow();
});

it('should be not created with not a number as number', () => {
  const data = { number: '123' };

  expect(() => { const newUiThruster = new UiThruster(data); }).toThrow();
});
