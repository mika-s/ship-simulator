import environmentReducer from '../environment.reducer';
import initialState from '../initialstate';

it('should return the initial state when no action', () => {
  expect(environmentReducer(initialState, {})).toEqual({
    wind: {
      speed: 0.0,
      direction: 0.0,
      forces: { surge: 0.0, sway: 0.0, yaw: 0.0 },
    },
    current: {
      speed: 0.0,
      direction: 0.0,
      forces: { surge: 0.0, sway: 0.0, yaw: 0.0 },
    },
  });
});

it('should handle SIMULATE', () => {
  const uiWind = { speed: 5.0, direction: 90.0 };
  const vesselSpeed = { u: 0.0, v: 0.0 };
  const vesselHeading = 0.0;
  const dimensions = {
    lpp: 100.0,
    loa: 108.0,
    breadth: 20.0,
    draft: 5.0,
    blockCoefficient: 0.71,
    displacement: 6000.0,
  };
  const windParams = {
    frontalArea: 400.0,
    lateralArea: 1000.0,
    sL: 67.0,
    vesselType: 'Offshore supply vessel',
    coefficientCalcType: 'blendermann',
    superStructureHeight: 17.5,
  };

  let newState = environmentReducer(initialState, { type: 'SIMULATE' }, uiWind, vesselSpeed, vesselHeading, dimensions, windParams);

  expect(newState.wind.speed).toEqual(uiWind.speed);
  expect(newState.wind.direction).toEqual(uiWind.direction);
  expect(newState.wind.forces.surge).toEqual(0.0);
  expect(newState.wind.forces.sway).toEqual(0);
  expect(newState.wind.forces.yaw).toEqual(0);

  expect(newState.current)
    .toEqual({
      speed: 0.0,
      direction: 0.0,
      forces: { surge: 0.0, sway: 0.0, yaw: 0.0 },
    });

  newState = environmentReducer(newState, { type: 'SIMULATE' }, uiWind, vesselSpeed, vesselHeading, dimensions, windParams);

  expect(newState.wind.speed).toEqual(uiWind.speed);
  expect(newState.wind.direction).toEqual(uiWind.direction);
  expect(newState.wind.forces.surge).toBeCloseTo(0.0);
  expect(newState.wind.forces.sway).toBeLessThan(-10.0);
  expect(newState.wind.forces.sway).toBeGreaterThan(-15.0);
  expect(newState.wind.forces.yaw).toBeLessThan(-2000.0);
  expect(newState.wind.forces.yaw).toBeGreaterThan(-3000.0);

  expect(newState.current)
    .toEqual({
      speed: 0.0,
      direction: 0.0,
      forces: { surge: 0.0, sway: 0.0, yaw: 0.0 },
    });
});
