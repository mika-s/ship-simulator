import timeseriesReducer from '../timeseries.reducer';
import getInitialState from '../initialstate';

const initialState = getInitialState();

it('should return the initial state when no action', () => {
  expect(timeseriesReducer(initialState, {})).toEqual(initialState);
});

it('should handle SIMULATE', () => {
  let time = 1;
  let estimator = {
    position: { longitude: 50.0, latitude: 4.0, heading: 180.0 },
    velocity: { u: 0.0, v: 0.0, r: 0.0 },
  };
  let autopilot = { headingPid: { p: 1.1, i: 2.0, d: 0.1 }, speedPid: { p: 1.1, i: 2.0, d: 0.1 } };
  let model = { position: { latitude: 50.0, longitude: 4.0, heading: Math.PI } };
  let sensors = { mrus: [{ roll: 2.31, pitch: -0.37 }] };
  let referencesystems = { gpses: [{ speed: 1.1 }] };

  let newState = timeseriesReducer(
    initialState, { type: 'SIMULATE' }, time, estimator,
    autopilot, model, sensors, referencesystems,
  );

  expect(newState)
    .toEqual({
      time: [2],
      estimator: {
        alphabeta: {
          position: {
            longitude: [50.0],
            latitude: [4.0],
            heading: [180.0],
          },
          velocity: {
            u: [0.0],
            v: [0.0],
            r: [0.0],
          },
        },
      },
      autopilot: {
        controllers: {
          headingPid: {
            p: [1.1],
            i: [2.0],
            d: [0.1],
          },
          speedPid: {
            p: [1.1],
            i: [2.0],
            d: [0.1],
          },
        },
      },
      model: {
        position: {
          latitude: [50.0],
          longitude: [4.0],
          heading: [180.0],
        },
      },
      sensors: {
        roll: [2.31],
        pitch: [-0.37],
      },
      referencesystems: {
        speed: [1.1],
      },
    });

  time = 2;
  estimator = {
    position: { longitude: 50.1, latitude: 4.1, heading: 180.0 },
    velocity: { u: 0.0, v: 0.0, r: 0.0 },
  };
  autopilot = { headingPid: { p: 1.2, i: 2.1, d: -0.1 }, speedPid: { p: 1.2, i: 2.1, d: -0.1 } };
  model = { position: { latitude: 50.1, longitude: 4.1, heading: Math.PI } };
  sensors = { mrus: [{ roll: 0.81, pitch: 0.22 }] };
  referencesystems = { gpses: [{ speed: 1.2 }] };

  newState = timeseriesReducer(
    newState, { type: 'SIMULATE' }, time, estimator,
    autopilot, model, sensors, referencesystems,
  );

  expect(newState)
    .toEqual({
      time: [2, 3],
      estimator: {
        alphabeta: {
          position: {
            longitude: [50.0, 50.1],
            latitude: [4.0, 4.1],
            heading: [180.0, 180.0],
          },
          velocity: {
            u: [0.0, 0.0],
            v: [0.0, 0.0],
            r: [0.0, 0.0],
          },
        },
      },
      autopilot: {
        controllers: {
          headingPid: {
            p: [1.1, 1.2],
            i: [2.0, 2.1],
            d: [0.1, -0.1],
          },
          speedPid: {
            p: [1.1, 1.2],
            i: [2.0, 2.1],
            d: [0.1, -0.1],
          },
        },
      },
      model: {
        position: {
          latitude: [50.0, 50.1],
          longitude: [4.0, 4.1],
          heading: [180.0, 180.0],
        },
      },
      sensors: {
        roll: [2.31, 0.81],
        pitch: [-0.37, 0.22],
      },
      referencesystems: {
        speed: [1.1, 1.2],
      },
    });
});


it('should handle STOP_SIMULATION', () => {
  expect(timeseriesReducer(initialState, { type: 'STOP_SIMULATION' }))
    .toEqual({
      time: [],
      estimator: {
        alphabeta: {
          position: {
            longitude: [],
            latitude: [],
            heading: [],
          },
          velocity: {
            u: [],
            v: [],
            r: [],
          },
        },
      },
      autopilot: {
        controllers: {
          headingPid: {
            p: [],
            i: [],
            d: [],
          },
          speedPid: {
            p: [],
            i: [],
            d: [],
          },
        },
      },
      model: {
        position: {
          latitude: [],
          longitude: [],
          heading: [],
        },
      },
      sensors: {
        roll: [],
        pitch: [],
      },
      referencesystems: {
        speed: [],
      },
    });
});
