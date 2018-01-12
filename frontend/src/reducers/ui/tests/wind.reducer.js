import mockInitialVesselModel from './testdata';
import windReducer from '../wind.reducer';
import getInitialState from '../initialstate';

const initialState = getInitialState(mockInitialVesselModel).wind;

it('should handle SET_WIND_SPEED', () => {
  const action = {
    type: 'SET_WIND_SPEED',
    payload: {
      speed: 5.0,
    },
  };

  expect(windReducer(initialState, action))
    .toEqual({
      ...initialState,
      speed: 5.0,
    });
});

it('should handle SET_WIND_DIRECTION', () => {
  const action = {
    type: 'SET_WIND_DIRECTION',
    payload: {
      direction: 55.0,
    },
  };

  expect(windReducer(initialState, action))
    .toEqual({
      ...initialState,
      direction: 55.0,
    });
});

it('should throw if wind direction is larger than 360.0°', () => {
  const action = {
    type: 'SET_WIND_DIRECTION',
    payload: {
      direction: 400.0,
    },
  };

  expect(() => { windReducer(initialState, action); }).toThrow();
});

it('should throw if wind direction is smaller than 0.0°', () => {
  const action = {
    type: 'SET_WIND_DIRECTION',
    payload: {
      direction: -10.0,
    },
  };

  expect(() => { windReducer(initialState, action); }).toThrow();
});

