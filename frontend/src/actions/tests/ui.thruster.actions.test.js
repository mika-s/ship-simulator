import * as actions from '../ui.thruster.actions';

it('should create an action to set the thruster demand', () => {
  const number = 1;
  const type = 'rpm';
  const demand = 5.0;

  const expectedAction = {
    type: 'SET_THRUSTER_DEMAND',
    payload: {
      number,
      type,
      demand,
    },
  };

  expect(actions.setThrusterDemand(number, type, demand)).toEqual(expectedAction);
});
