import * as actions from '../ui.simulation.actions';

it('should create an action to set wind speed in the UI block', () => {
  const speed = 5.0;

  const expectedAction = {
    type: 'SET_WIND_SPEED',
    payload: {
      speed,
    },
  };

  expect(actions.setWindSpeed(speed)).toEqual(expectedAction);
});

it('should create an action to set wind direction in the UI block', () => {
  const direction = 36.0;

  const expectedAction = {
    type: 'SET_WIND_DIRECTION',
    payload: {
      direction,
    },
  };

  expect(actions.setWindDirection(direction)).toEqual(expectedAction);
});

it('should create an action to set position in the UI and vesselmodel block', () => {
  const position = {
    latitude: 5.0,
    longitude: 40.0,
    heading: 45.0,
  };

  const expectedAction = {
    type: 'SET_INITIAL_POSITION',
    payload: {
      position,
    },
  };

  expect(actions.setPosition(position)).toEqual(expectedAction);
});

