import { initialVesselModel, initialController, initialEstimator } from './testdata';
import mapReducer from '../map.reducer';
import getInitialState from '../initialstate';
import { motion } from '../../../util/enums';

const initialState = getInitialState(initialVesselModel, initialController, initialEstimator).map;

it('should handle INC_ZOOM_LEVEL', () => {
  const action = {
    type: 'INC_ZOOM_LEVEL',
  };

  expect(mapReducer(initialState, action))
    .toEqual({
      ...initialState,
      zoomlevel: initialState.zoomlevel + 1,
    });
});

it('should handle INC_ZOOM_LEVEL when going above zoomlevel 19', () => {
  const action = {
    type: 'INC_ZOOM_LEVEL',
  };

  const state = { zoomlevel: 19 };

  expect(mapReducer(state, action))
    .toEqual({
      ...state,
      zoomlevel: 19,
    });
});

it('should handle DEC_ZOOM_LEVEL', () => {
  const action = {
    type: 'DEC_ZOOM_LEVEL',
  };

  expect(mapReducer(initialState, action))
    .toEqual({
      ...initialState,
      zoomlevel: initialState.zoomlevel - 1,
    });
});

it('should handle DEC_ZOOM_LEVEL when going below zoomlevel 0', () => {
  const action = {
    type: 'DEC_ZOOM_LEVEL',
  };

  const state = { zoomlevel: 0 };

  expect(mapReducer(state, action))
    .toEqual({
      ...state,
      zoomlevel: 0,
    });
});

it('should handle TOGGLE_MOTION_TYPE', () => {
  const action = {
    type: 'TOGGLE_MOTION_TYPE',
  };

  expect(mapReducer(initialState, action))
    .toEqual({
      ...initialState,
      motion: initialState.motion === motion.TRUE ? motion.RELATIVE : motion.TRUE,
    });
});
