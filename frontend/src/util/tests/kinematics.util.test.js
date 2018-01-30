import { wrapTo0To360, wrapTo0To2pi, wrapToPipi } from '../kinematics.util';

/* wrapTo0To360() */

it('wrapTo0To360(400) = 40 deg', () => {
  const wrappedAngle = wrapTo0To360(400);
  expect(wrappedAngle).toEqual(40);
});

it('wrapTo0To360(-20) = 340 deg', () => {
  const wrappedAngle = wrapTo0To360(-20);
  expect(wrappedAngle).toEqual(340);
});

it('wrapTo0To360(-350) = 10 deg', () => {
  const wrappedAngle = wrapTo0To360(-350);
  expect(wrappedAngle).toEqual(10);
});

it('wrapTo0To360(0) = 0 deg', () => {
  const wrappedAngle = wrapTo0To360(0);
  expect(wrappedAngle).toEqual(0);
});

it('wrapTo0To360(730) = 10 deg', () => {
  const wrappedAngle = wrapTo0To360(730);
  expect(wrappedAngle).toEqual(10);
});

/* wrapTo0To2pi() */

it('wrapTo0To2pi(3π) = π', () => {
  const wrappedAngle = wrapTo0To2pi(3 * Math.PI);
  expect(wrappedAngle).toBeCloseTo(Math.PI, 5);
});

it('wrapTo0To2pi(-π) = π', () => {
  const wrappedAngle = wrapTo0To2pi(-Math.PI);
  expect(wrappedAngle).toBeCloseTo(Math.PI, 5);
});

it('wrapTo0To2pi(-π/2) = 3/2π', () => {
  const wrappedAngle = wrapTo0To2pi(-Math.PI / 2);
  expect(wrappedAngle).toBeCloseTo((3 / 2) * Math.PI, 5);
});

it('wrapTo0To2pi(0) = 0', () => {
  const wrappedAngle = wrapTo0To2pi(0);
  expect(wrappedAngle).toEqual(0);
});

it('wrapTo0To2pi(5.5π) = 3/2π', () => {
  const wrappedAngle = wrapTo0To2pi(5.5 * Math.PI);
  expect(wrappedAngle).toBeCloseTo((3 / 2) * Math.PI, 5);
});

/* wrapToPipi() */

it('wrapToPipi(π/2) = π/2', () => {
  const wrappedAngle = wrapToPipi(0.5 * Math.PI);
  expect(wrappedAngle.angle).toBeCloseTo(0.5 * Math.PI, 5);
  expect(wrappedAngle.revolutions).toEqual(0);
});

it('wrapToPipi(-π/2) = -π/2', () => {
  const wrappedAngle = wrapToPipi(-0.5 * Math.PI);
  expect(wrappedAngle.angle).toBeCloseTo(-0.5 * Math.PI, 5);
  expect(wrappedAngle.revolutions).toEqual(-0);
});

it('wrapToPipi(2π) = 0', () => {
  const wrappedAngle = wrapToPipi(2 * Math.PI);
  expect(wrappedAngle.angle).toBeCloseTo(0 * Math.PI, 5);
  expect(wrappedAngle.revolutions).toEqual(1);
});

it('wrapToPipi(1.5π) = -π/2', () => {
  const wrappedAngle = wrapToPipi(1.5 * Math.PI);
  expect(wrappedAngle.angle).toBeCloseTo(-0.5 * Math.PI, 5);
  expect(wrappedAngle.revolutions).toEqual(1);
});

