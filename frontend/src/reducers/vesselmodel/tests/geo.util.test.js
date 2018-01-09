import GeoUtil from '../geo.util';

it('getPositionInLatLon() should return new position 1', () => {
  const previousLatLonPos = { latitude: 50.0, longitude: 4.0 };
  const newInMeterPos = { latitude: 500, longitude: 0.0 };
  const previousInMeterPos = { latitude: 0, longitude: 0.0 };

  const newPosition =
    GeoUtil.getPositionInLatLon(previousLatLonPos, newInMeterPos, previousInMeterPos);

  expect(newPosition.latitude).toBeCloseTo(50.0044444, 3);
  expect(newPosition.longitude).toBeCloseTo(4.0, 4);
});

it('getPositionInLatLon() should return new position 2', () => {
  const previousLatLonPos = { latitude: 50.0, longitude: 4.0 };
  const newInMeterPos = { latitude: -500, longitude: 0.0 };
  const previousInMeterPos = { latitude: 0, longitude: 0.0 };

  const newPosition =
    GeoUtil.getPositionInLatLon(previousLatLonPos, newInMeterPos, previousInMeterPos);

  expect(newPosition.latitude).toBeCloseTo(49.9955556, 3);
  expect(newPosition.longitude).toBeCloseTo(4.0, 4);
});
