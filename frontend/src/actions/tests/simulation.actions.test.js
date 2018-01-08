import * as actions from '../simulation.actions';

it('should create an action to run a simulation tick', () => {
  const expectedAction = {
    type: 'SIMULATE',
  };

  expect(actions.simulate()).toEqual(expectedAction);
});

it('should create an action to pause the simulation', () => {
  const expectedAction = {
    type: 'PAUSE_SIMULATION',
  };

  expect(actions.pauseSimulation()).toEqual(expectedAction);
});

it('should create an action to stop the simulation', () => {
  const expectedAction = {
    type: 'STOP_SIMULATION',
  };

  expect(actions.stopSimulation()).toEqual(expectedAction);
});
