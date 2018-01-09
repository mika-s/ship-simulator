import VesselUtil from '../vessel.util';

/* transformTo0To360() */

it('transformTo0To360(400) = 40 deg', () => {
  const transformedAngle = VesselUtil.transformTo0To360(400);
  expect(transformedAngle).toEqual(40);
});

it('transformTo0To360(-20) = 340 deg', () => {
  const transformedAngle = VesselUtil.transformTo0To360(-20);
  expect(transformedAngle).toEqual(340);
});

it('transformTo0To360(-350) = 10 deg', () => {
  const transformedAngle = VesselUtil.transformTo0To360(-350);
  expect(transformedAngle).toEqual(10);
});

it('transformTo0To360(0) = 0 deg', () => {
  const transformedAngle = VesselUtil.transformTo0To360(0);
  expect(transformedAngle).toEqual(0);
});

it('transformTo0To360(730) = 10 deg', () => {
  const transformedAngle = VesselUtil.transformTo0To360(730);
  expect(transformedAngle).toEqual(10);
});

/* transformTo0To2pi() */

it('transformTo0To2pi(3π) = π', () => {
  const transformedAngle = VesselUtil.transformTo0To2pi(3 * Math.PI);
  expect(transformedAngle).toBeCloseTo(Math.PI, 5);
});

it('transformTo0To2pi(-π) = π', () => {
  const transformedAngle = VesselUtil.transformTo0To2pi(-Math.PI);
  expect(transformedAngle).toBeCloseTo(Math.PI, 5);
});

it('transformTo0To2pi(-π/2) = 3/2π', () => {
  const transformedAngle = VesselUtil.transformTo0To2pi(-Math.PI / 2);
  expect(transformedAngle).toBeCloseTo((3 / 2) * Math.PI, 5);
});

it('transformTo0To2pi(0) = 0', () => {
  const transformedAngle = VesselUtil.transformTo0To2pi(0);
  expect(transformedAngle).toEqual(0);
});

it('transformTo0To2pi(5.5π) = 3/2π', () => {
  const transformedAngle = VesselUtil.transformTo0To2pi(5.5 * Math.PI);
  expect(transformedAngle).toBeCloseTo((3 / 2) * Math.PI, 5);
});

/* calculateFrontalWindArea() */

it('calculateFrontalWindArea(20, 25) = 400', () => {
  const area = VesselUtil.calculateFrontalWindArea(20, 25);
  expect(area).toEqual(400);
});

/* calculateLateralWindArea() */

it('calculateLateralWindArea(100, 25) = 1000', () => {
  const area = VesselUtil.calculateLateralWindArea(100, 25);
  expect(area).toEqual(1000);
});

