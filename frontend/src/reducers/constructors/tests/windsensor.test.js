import Windsensor from '../windsensor';

/* eslint no-unused-vars: "off" */

it('should be created successfully with correct parameters', () => {
  const data = { number: 1, initialSpeed: 5.0, initialDirection: 172.3 };
  const newWindsensor = new Windsensor(data);

  expect(newWindsensor).toEqual({ number: 1, speed: 5.0, direction: 172.3 });
});

it('should be not created with too small number', () => {
  const data = { number: -1, initialSpeed: 5.0, initialDirection: 172.3 };

  expect(() => { const newWindsensor = new Windsensor(data); }).toThrow();
});

it('should be not created with too large number', () => {
  const data = { number: 200, initialSpeed: 5.0, initialDirection: 172.3 };

  expect(() => { const newWindsensor = new Windsensor(data); }).toThrow();
});

it('should be not created with not a number as number', () => {
  const data = { number: 'asdf', initialSpeed: 5.0, initialDirection: 172.3 };

  expect(() => { const newWindsensor = new Windsensor(data); }).toThrow();
});

it('should be not created with too large initial speed', () => {
  const data = { number: 1, initialSpeed: 150.0, initialDirection: 172.3 };

  expect(() => { const newWindsensor = new Windsensor(data); }).toThrow();
});

it('should be not created with too small initial speed', () => {
  const data = { number: 1, initialSpeed: -1.0, initialDirection: 172.3 };

  expect(() => { const newWindsensor = new Windsensor(data); }).toThrow();
});

it('should be not created with too large initial direction', () => {
  const data = { number: 1, initialSpeed: 5.0, initialDirection: 390.1 };

  expect(() => { const newWindsensor = new Windsensor(data); }).toThrow();
});

it('should be not created with too small initial direction', () => {
  const data = { number: 1, initialSpeed: 5.0, initialDirection: -2.1 };

  expect(() => { const newWindsensor = new Windsensor(data); }).toThrow();
});

it('should be not created with not a number as initial speed', () => {
  const data = { number: 1, initialSpeed: 'asdf', initialDirection: 172.3 };

  expect(() => { const newWindsensor = new Windsensor(data); }).toThrow();
});

it('should be not created with not a number as initial direction', () => {
  const data = { number: 1, initialSpeed: 5.0, initialDirection: '20.0' };

  expect(() => { const newWindsensor = new Windsensor(data); }).toThrow();
});
