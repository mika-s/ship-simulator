import timeseriesReducer from '../timeseries.reducer';
import getInitialState from '../initialstate';

const initialState = getInitialState();

it('should return the initial state when no action', () => {
  expect(timeseriesReducer(initialState, {})).toEqual(initialState);
});

it('should handle SIMULATE', () => {
  let time = 1;
  let model = { position: { latitude: 50.0, longitude: 4.0, heading: Math.PI } };
  let sensors = { mrus: [{ roll: 2.31, pitch: -0.37 }] };

  let newState = timeseriesReducer(initialState, { type: 'SIMULATE' }, time, model, sensors);

  expect(newState)
    .toEqual({
      time: [2],
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
    });

  time = 2;
  model = { position: { latitude: 50.1, longitude: 4.1, heading: Math.PI } };
  sensors = { mrus: [{ roll: 0.81, pitch: 0.22 }] };

  newState = timeseriesReducer(newState, { type: 'SIMULATE' }, time, model, sensors);

  expect(newState)
    .toEqual({
      time: [2, 3],
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
    });
});


it('should handle STOP_SIMULATION', () => {
  expect(timeseriesReducer(initialState, { type: 'STOP_SIMULATION' }))
    .toEqual({
      time: [],
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
    });
});
