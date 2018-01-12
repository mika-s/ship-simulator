import mockInitialVesselModel from './testdata';
import currentReducer from '../current.reducer';
import getInitialState from '../initialstate';

const initialState = getInitialState(mockInitialVesselModel).current;

it('should handle SET_CURRENT_SPEED', () => {
  const action = {
    type: 'SET_CURRENT_SPEED',
    payload: {
      speed: 3.0,
    },
  };

  expect(currentReducer(initialState, action))
    .toEqual({
      ...initialState,
      speed: 3.0,
    });
});

it('should handle SET_CURRENT_DIRECTION', () => {
  const action = {
    type: 'SET_CURRENT_DIRECTION',
    payload: {
      direction: 55.0,
    },
  };

  expect(currentReducer(initialState, action))
    .toEqual({
      ...initialState,
      direction: 55.0,
    });
});

it('should throw if current direction is larger than 360.0°', () => {
  const action = {
    type: 'SET_CURRENT_DIRECTION',
    payload: {
      direction: 400.0,
    },
  };

  expect(() => { currentReducer(initialState, action); }).toThrow();
});

it('should throw if current direction is smaller than 0.0°', () => {
  const action = {
    type: 'SET_CURRENT_DIRECTION',
    payload: {
      direction: -10.0,
    },
  };

  expect(() => { currentReducer(initialState, action); }).toThrow();
});
