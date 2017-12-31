import VesselUtil from '../reducers/vesselmodel/VesselUtil';

it('transforms 400 deg to 40 deg', () => {
  const transformedAngle = VesselUtil.transformTo0To360(400);
  expect(transformedAngle).toEqual(40);
});

it('transforms -20 deg to 340 deg', () => {
  const transformedAngle = VesselUtil.transformTo0To360(-20);
  expect(transformedAngle).toEqual(340);
});

it('transforms -350 deg to 10 deg', () => {
  const transformedAngle = VesselUtil.transformTo0To360(-350);
  expect(transformedAngle).toEqual(10);
});

it('transforms 0 deg to 0 deg', () => {
  const transformedAngle = VesselUtil.transformTo0To360(0);
  expect(transformedAngle).toEqual(0);
});

it('transforms 730 deg to 10 deg', () => {
  const transformedAngle = VesselUtil.transformTo0To360(730);
  expect(transformedAngle).toEqual(10);
});
