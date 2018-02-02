import MapUtil from '../MapUtil';

it('getInitialMapProperties return initial map properties', () => {
  const mapProperties = MapUtil.getInitialMapProperties();

  expect(mapProperties).toBeDefined();
  expect(mapProperties.labels).toBeDefined();
  expect(mapProperties.datasets).toBeDefined();
});

it('getInitialOptions returns initial map options', () => {
  const mapOptions = MapUtil.getInitialOptions();

  expect(mapOptions).toBeDefined();
  expect(mapOptions.animation).toBeDefined();
  expect(mapOptions.hover).toBeDefined();
});
