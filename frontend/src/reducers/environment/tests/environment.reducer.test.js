import environmentReducer from '../environment.reducer';
import getInitialState from '../initialstate';
import { calculateDrag } from '../../constructors/vesselmodel.util';

const initialState = getInitialState();

it('should return the initial state when no action', () => {
  expect(environmentReducer(initialState, {})).toEqual(initialState);
});

it('should handle SIMULATE with some wind and no current', () => {
  const uiCurrent = { speed: 0.0, direction: 0.0 };
  const uiWind = { speed: 5.0, direction: 90.0 };
  const vesselSpeed = { u: 0.0, v: 0.0, r: 0.0 };
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
  const drag = calculateDrag(dimensions.lpp, dimensions.breadth, dimensions.draft);

  let newState = environmentReducer(
    initialState, { type: 'SIMULATE' }, uiCurrent, uiWind,
    vesselSpeed, vesselHeading, dimensions, windParams, drag,
  );

  expect(newState.wind.speed).toEqual(uiWind.speed);
  expect(newState.wind.direction).toEqual(uiWind.direction);
  expect(newState.wind.forces.surge).toEqual(0.0);
  expect(newState.wind.forces.sway).toEqual(0);
  expect(newState.wind.forces.yaw).toEqual(0);

  expect(newState.current.speed).toEqual(uiCurrent.speed);
  expect(newState.current.direction).toEqual(uiCurrent.direction);
  expect(newState.current.forces.surge).toBeCloseTo(0);
  expect(newState.current.forces.sway).toBeCloseTo(0);
  expect(newState.current.forces.yaw).toBeCloseTo(0);

  newState = environmentReducer(
    newState, { type: 'SIMULATE' }, uiCurrent, uiWind,
    vesselSpeed, vesselHeading, dimensions, windParams, drag,
  );

  expect(newState.wind.speed).toEqual(uiWind.speed);
  expect(newState.wind.direction).toEqual(uiWind.direction);
  expect(newState.wind.forces.surge).toBeCloseTo(0.0);
  expect(newState.wind.forces.sway).toBeLessThan(-10.0);
  expect(newState.wind.forces.sway).toBeGreaterThan(-15.0);
  expect(newState.wind.forces.yaw).toBeLessThan(-2000.0);
  expect(newState.wind.forces.yaw).toBeGreaterThan(-3000.0);

  expect(newState.current.forces.surge).toBeCloseTo(0);
  expect(newState.current.forces.sway).toBeCloseTo(0);
  expect(newState.current.forces.yaw).toBeCloseTo(0);
});
