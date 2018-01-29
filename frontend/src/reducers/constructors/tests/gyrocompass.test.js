import Gyrocompass from '../gyrocompass';

/* eslint no-unused-vars: "off" */

it('should be created successfully with correct parameters', () => {
  const data = {
    number: 1,
    initialHeading: 123.4,
  };

  const newGyrocompass = new Gyrocompass(data);

  expect(newGyrocompass).toEqual({ number: 1, heading: 123.4, rot: 0.0 });
});

it('should be not created with too small number', () => {
  const data = {
    number: -1,
    initialHeading: 123.4,
  };

  expect(() => { const newGyrocompass = new Gyrocompass(data); }).toThrow();
});

it('should be not created with too large number', () => {
  const data = {
    number: 100,
    initialHeading: 123.4,
  };

  expect(() => { const newGyrocompass = new Gyrocompass(data); }).toThrow();
});

it('should be not created with not a number as number', () => {
  const data = {
    number: '1',
    initialHeading: 123.4,
  };

  expect(() => { const newGyrocompass = new Gyrocompass(data); }).toThrow();
});

it('should be not created with too large initial heading', () => {
  const data = {
    number: 1,
    initialHeading: 370.0,
  };

  expect(() => { const newGyrocompass = new Gyrocompass(data); }).toThrow();
});

it('should be not created with too small initial heading', () => {
  const data = {
    number: 1,
    initialHeading: -1.0,
  };

  expect(() => { const newGyrocompass = new Gyrocompass(data); }).toThrow();
});

it('should be not created with not a number as initial heading', () => {
  const data = {
    number: 1,
    initialHeading: '1a',
  };

  expect(() => { const newGyrocompass = new Gyrocompass(data); }).toThrow();
});
