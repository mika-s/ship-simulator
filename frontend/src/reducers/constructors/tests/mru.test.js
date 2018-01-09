import MRU from '../mru';

/* eslint no-unused-vars: "off" */

it('should be created successfully with correct parameters', () => {
  const data = { number: 1, initialRoll: 1.4, initialPitch: -1.2 };
  const newMRU = new MRU(data);

  expect(newMRU).toEqual({ number: 1, roll: 1.4, pitch: -1.2 });
});

it('should be not created with too small number', () => {
  const data = { number: -1, initialRoll: 1.4, initialPitch: -1.2 };

  expect(() => { const newMRU = new MRU(data); }).toThrow();
});

it('should be not created with too large number', () => {
  const data = { number: 10000, initialRoll: 1.4, initialPitch: -1.2 };

  expect(() => { const newMRU = new MRU(data); }).toThrow();
});

it('should be not created with not a number as number', () => {
  const data = { number: 'asdf', initialRoll: 1.4, initialPitch: -1.2 };

  expect(() => { const newMRU = new MRU(data); }).toThrow();
});

it('should be not created with too large initial roll', () => {
  const data = { number: 1, initialRoll: 50.0, initialPitch: -1.2 };

  expect(() => { const newMRU = new MRU(data); }).toThrow();
});

it('should be not created with too small initial roll', () => {
  const data = { number: 1, initialRoll: -52.0, initialPitch: -1.2 };

  expect(() => { const newMRU = new MRU(data); }).toThrow();
});

it('should be not created with too large initial pitch', () => {
  const data = { number: 1, initialRoll: 1.4, initialPitch: 60.1 };

  expect(() => { const newMRU = new MRU(data); }).toThrow();
});

it('should be not created with too small initial pitch', () => {
  const data = { number: 1, initialRoll: 1.4, initialPitch: -50.1 };

  expect(() => { const newMRU = new MRU(data); }).toThrow();
});

it('should be not created with not a number as initial roll', () => {
  const data = { number: 1, initialRoll: 'asdf', initialPitch: -1.2 };

  expect(() => { const newMRU = new MRU(data); }).toThrow();
});

it('should be not created with not a number as initial pitch', () => {
  const data = { number: 1, initialRoll: 1.4, initialPitch: '-20.0' };

  expect(() => { const newMRU = new MRU(data); }).toThrow();
});
