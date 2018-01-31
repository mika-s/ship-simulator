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

it('should create an action to change P gain of the heading controller', () => {
  const gain = 1.0;

  const expectedAction = {
    type: 'SET_AUTOPILOT_P_GAIN',
    payload: {
      gain,
    },
  };

  expect(actions.setAutopilotPgain(gain)).toEqual(expectedAction);
});

it('should create an action to change I gain of the heading controller', () => {
  const gain = 1.0;

  const expectedAction = {
    type: 'SET_AUTOPILOT_I_GAIN',
    payload: {
      gain,
    },
  };

  expect(actions.setAutopilotIgain(gain)).toEqual(expectedAction);
});

it('should create an action to change D gain of the heading controller', () => {
  const gain = 1.0;

  const expectedAction = {
    type: 'SET_AUTOPILOT_D_GAIN',
    payload: {
      gain,
    },
  };

  expect(actions.setAutopilotDgain(gain)).toEqual(expectedAction);
});

it('should create an action to change P gain of the speed controller', () => {
  const gain = 1.0;

  const expectedAction = {
    type: 'SET_AUTOPILOT_SPEED_P_GAIN',
    payload: {
      gain,
    },
  };

  expect(actions.setSpeedPgain(gain)).toEqual(expectedAction);
});

it('should create an action to change I gain of the speed controller', () => {
  const gain = 1.0;

  const expectedAction = {
    type: 'SET_AUTOPILOT_SPEED_I_GAIN',
    payload: {
      gain,
    },
  };

  expect(actions.setSpeedIgain(gain)).toEqual(expectedAction);
});

it('should create an action to change D gain of the speed controller', () => {
  const gain = 1.0;

  const expectedAction = {
    type: 'SET_AUTOPILOT_SPEED_D_GAIN',
    payload: {
      gain,
    },
  };

  expect(actions.setSpeedDgain(gain)).toEqual(expectedAction);
});

it('should create an action to change mode', () => {
  const expectedAction = {
    type: 'TOGGLE_AUTOPILOT',
  };

  expect(actions.toggleAutopilot()).toEqual(expectedAction);
});
