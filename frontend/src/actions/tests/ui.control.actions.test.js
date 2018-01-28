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

it('should create an action to change mode', () => {
  const heading = 'LEVER';

  const expectedAction = {
    type: 'SET_AUTOPILOT_HEADING',
    payload: {
      heading,
    },
  };

  expect(actions.setAutopilotHeading(heading)).toEqual(expectedAction);
});

it('should create an action to change mode', () => {
  const speed = 5.0;

  const expectedAction = {
    type: 'SET_AUTOPILOT_SPEED',
    payload: {
      speed,
    },
  };

  expect(actions.setAutopilotSpeed(speed)).toEqual(expectedAction);
});

it('should create an action to change alpha for heading', () => {
  const alpha = 0.8;

  const expectedAction = {
    type: 'SET_ALPHA_FOR_HEADING',
    payload: {
      alpha,
    },
  };

  expect(actions.setAlphaForHeading(alpha)).toEqual(expectedAction);
});

it('should create an action to change beta for heading', () => {
  const beta = 0.8;

  const expectedAction = {
    type: 'SET_BETA_FOR_HEADING',
    payload: {
      beta,
    },
  };

  expect(actions.setBetaForHeading(beta)).toEqual(expectedAction);
});

it('should create an action to change mode', () => {
  const expectedAction = {
    type: 'TOGGLE_AUTOPILOT',
  };

  expect(actions.toggleAutopilot()).toEqual(expectedAction);
});
