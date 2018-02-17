import { getHeadingFromGyrocompasses } from '../estimator.util';

/* eslint no-unused-vars: "off" */

it('filtered heading should be 10.0 given 10.0, 10.0, 10.0', () => {
  const gyrocompasses = [
    { number: 1, heading: 10.0 },
    { number: 2, heading: 10.0 },
    { number: 3, heading: 10.0 },
  ];

  const filteredHeading = getHeadingFromGyrocompasses(gyrocompasses);

  expect(filteredHeading).toBeCloseTo(10.0);
});

it('filtered heading should be 0.0 given 10.0, 350.0, 0.0', () => {
  const gyrocompasses = [
    { number: 1, heading: 10.0 },
    { number: 2, heading: 350.0 },
    { number: 3, heading: 0.0 },
  ];

  const filteredHeading = getHeadingFromGyrocompasses(gyrocompasses);

  expect(filteredHeading).toBeCloseTo(0.0);
});

it('filtered heading should be 180.0 given 170.0, 180.0, 190.0', () => {
  const gyrocompasses = [
    { number: 1, heading: 170.0 },
    { number: 2, heading: 180.0 },
    { number: 3, heading: 190.0 },
  ];

  const filteredHeading = getHeadingFromGyrocompasses(gyrocompasses);

  expect(filteredHeading).toBeCloseTo(180.0);
});

