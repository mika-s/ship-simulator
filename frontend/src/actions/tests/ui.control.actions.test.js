import * as actions from '../ui.control.actions';

it('should create an action to change mode', () => {
  const mode = 'LEVER';

  const expectedAction = {
    type: 'SET_CONTROL_MODE',
    payload: {
      mode,
    },
  };

  expect(actions.setControlMode(mode)).toEqual(expectedAction);
});
