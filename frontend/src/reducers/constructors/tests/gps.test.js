import GPS from '../gps';

/* eslint no-unused-vars: "off" */

it('should be created successfully with correct parameters', () => {
  const data = {
    number: 1,
    initialPosition: { latitude: 50.0, longitude: 4.0 },
  };

  const newGPS = new GPS(data);

  expect(newGPS).toEqual({
    number: 1,
    position: { latitude: 50.0, longitude: 4.0 },
    speed: 0.0,
    direction: 0.0,
  });
});

it('should be not created with too small number', () => {
  const data = {
    number: -1,
    initialPosition: { latitude: 50.0, longitude: 4.0 },
  };

  expect(() => { const newGPS = new GPS(data); }).toThrow();
});

it('should be not created with too large number', () => {
  const data = {
    number: 10000,
    initialPosition: { latitude: 50.0, longitude: 4.0 },
  };

  expect(() => { const newGPS = new GPS(data); }).toThrow();
});

it('should be not created with not a number as number', () => {
  const data = {
    number: 'asdf',
    initialPosition: { latitude: 50.0, longitude: 4.0 },
  };

  expect(() => { const newGPS = new GPS(data); }).toThrow();
});

it('should be not created with too large latitude', () => {
  const data = {
    number: 1,
    initialPosition: { latitude: 5000.0, longitude: 4.0 },
  };

  expect(() => { const newGPS = new GPS(data); }).toThrow();
});

it('should be not created with too small latitude', () => {
  const data = {
    number: 1,
    initialPosition: { latitude: -180.0, longitude: 4.0 },
  };

  expect(() => { const newGPS = new GPS(data); }).toThrow();
});

it('should be not created with too large longitude', () => {
  const data = {
    number: 1,
    initialPosition: { latitude: 50.0, longitude: 400.0 },
  };

  expect(() => { const newGPS = new GPS(data); }).toThrow();
});

it('should be not created with too small longitude', () => {
  const data = {
    number: 1,
    initialPosition: { latitude: 50.0, longitude: -200.0 },
  };

  expect(() => { const newGPS = new GPS(data); }).toThrow();
});

it('should be not created with not a number as latitude', () => {
  const data = {
    number: 1,
    initialPosition: { latitude: 'asdf', longitude: -200.0 },
  };

  expect(() => { const newGPS = new GPS(data); }).toThrow();
});

it('should be not created with not a number as longitude', () => {
  const data = {
    number: 1,
    initialPosition: { latitude: 50.0, longitude: '-20.0' },
  };

  expect(() => { const newGPS = new GPS(data); }).toThrow();
});
