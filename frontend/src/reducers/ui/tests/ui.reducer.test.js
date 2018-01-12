import mockInitialVesselModel from './testdata';
import uiReducer from '../ui.reducer';
import getInitialState from '../initialstate';
import { motion } from '../../../util/enums';

const initialState = getInitialState(mockInitialVesselModel);

it('should handle SET_THRUSTER_DEMAND', () => {
  const action = {
    type: 'SET_THRUSTER_DEMAND',
    payload: {
      number: 1,
      type: 'pitch',
      demand: 50.0,
    },
  };

  expect(uiReducer(initialState, action))
    .toEqual({
      ...initialState,

      thrusters: [
        { number: 1, demand: { rpm: 0.0, pitch: 50.0, azimuth: 0.0 } },
        { number: 2, demand: { rpm: 0.0, pitch: 0.0, azimuth: 0.0 } },
        { number: 3, demand: { rpm: 0.0, pitch: 0.0, azimuth: 0.0 } },
      ],
    });
});

it('should handle SET_WIND_SPEED', () => {
  const action = {
    type: 'SET_WIND_SPEED',
    payload: {
      speed: 5.0,
    },
  };

  expect(uiReducer(initialState, action))
    .toEqual({
      ...initialState,

      wind: {
        ...initialState.wind,
        speed: 5.0,
      },
    });
});

it('should handle SET_WIND_DIRECTION', () => {
  const action = {
    type: 'SET_WIND_DIRECTION',
    payload: {
      direction: 55.0,
    },
  };

  expect(uiReducer(initialState, action))
    .toEqual({
      ...initialState,

      wind: {
        ...initialState.wind,
        direction: 55.0,
      },
    });
});

it('should handle SET_INITIAL_POSITION', () => {
  const action = {
    type: 'SET_INITIAL_POSITION',
    payload: {
      position: {
        latitude: 55.0,
        longitude: 10.0,
        heading: 123.0,
      },
    },
  };

  expect(uiReducer(initialState, action))
    .toEqual({
      ...initialState,

      position: {
        latitude: 55.0,
        longitude: 10.0,
        heading: 123.0,
      },
    });
});

it('should handle SET_DASHBOARD_PANE', () => {
  const action = {
    type: 'SET_DASHBOARD_PANE',
    payload: {
      number: 1,
      pane: 'heading',
    },
  };

  expect(uiReducer(initialState, action))
    .toEqual({
      ...initialState,
      dashboard: {
        ...initialState.dashboard,
        panes: {
          ...initialState.dashboard.panes,
          1: 'heading',
        },
      },
    });
});

it('should handle INC_ZOOM_LEVEL', () => {
  const action = {
    type: 'INC_ZOOM_LEVEL',
  };

  expect(uiReducer(initialState, action))
    .toEqual({
      ...initialState,
      map: {
        ...initialState.map,
        zoomlevel: initialState.map.zoomlevel + 1,
      },
    });
});

it('should handle INC_ZOOM_LEVEL when going above zoomlevel 19', () => {
  const action = {
    type: 'INC_ZOOM_LEVEL',
  };

  const state = {
    map: {
      zoomlevel: 19,
    },
  };

  expect(uiReducer(state, action))
    .toEqual({
      ...state,
      map: {
        ...state.map,
        zoomlevel: 19,
      },
    });
});

it('should handle DEC_ZOOM_LEVEL', () => {
  const action = {
    type: 'DEC_ZOOM_LEVEL',
  };

  expect(uiReducer(initialState, action))
    .toEqual({
      ...initialState,
      map: {
        ...initialState.map,
        zoomlevel: initialState.map.zoomlevel - 1,
      },
    });
});

it('should handle DEC_ZOOM_LEVEL when going below zoomlevel 0', () => {
  const action = {
    type: 'DEC_ZOOM_LEVEL',
  };

  const state = {
    map: {
      zoomlevel: 0,
    },
  };

  expect(uiReducer(state, action))
    .toEqual({
      ...state,
      map: {
        ...state.map,
        zoomlevel: 0,
      },
    });
});

it('should handle TOGGLE_MOTION_TYPE', () => {
  const action = {
    type: 'TOGGLE_MOTION_TYPE',
  };

  expect(uiReducer(initialState, action))
    .toEqual({
      ...initialState,
      map: {
        ...initialState.map,
        motion: initialState.map.motion === motion.TRUE ? motion.RELATIVE : motion.TRUE,
      },
    });
});
