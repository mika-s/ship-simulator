import Thruster from '../thruster';
import thrusterData from './testdata';

/* eslint no-unused-vars: "off" */

it('should be created successfully with correct parameters', () => {
  const newThruster = new Thruster(thrusterData[0]);

  expect(newThruster.number).toEqual(1);
  expect(newThruster.name).toEqual('OK RPM Tunnel');
  expect(newThruster.thrusterType).toEqual('tunnel');
  expect(newThruster.controlType).toEqual('rpm');
  expect(newThruster.maxPower).toEqual({ positive: 800.0, negative: 800.0 });
  expect(newThruster.location).toEqual({ x: 45.0, y: 0.0 });
  expect(newThruster.misc).toEqual({ maxRudderAngle: 45.0 });
  expect(newThruster.risetimes).toEqual({ rpm: { positive: 0.1, negative: -0.1 } });
  expect(newThruster.force).toEqual(0.0);
  expect(newThruster.power).toEqual(0.0);
  expect(newThruster.pitchExponent).toEqual({ positive: 0.0, negative: 0.0 });
  expect(newThruster.pitchPowerExponent).toEqual({ positive: 0.0, negative: 0.0 });
  expect(newThruster.rpmExponent).toEqual({ positive: 2.0, negative: 2.0 });
  expect(newThruster.rpmPowerExponent).toEqual({ positive: 3.0, negative: 3.0 });
  expect(newThruster.maxForce.positive).toBeCloseTo(12.0);
  expect(newThruster.maxForce.negative).toBeCloseTo(-12.0);
  expect(newThruster.demand).toEqual({ rpm: 0.0, pitch: 0.0, azimuth: 90.0 });
  expect(newThruster.feedback).toEqual({ rpm: 0.0, pitch: 0.0, azimuth: 90.0 });
});
