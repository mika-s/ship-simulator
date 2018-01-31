export function setControlMode(mode) {
  return {
    type: 'SET_CONTROL_MODE',
    payload: {
      mode,
    },
  };
}

export function setAutopilotHeading(heading) {
  return {
    type: 'SET_AUTOPILOT_HEADING',
    payload: {
      heading,
    },
  };
}

export function setAutopilotSpeed(speed) {
  return {
    type: 'SET_AUTOPILOT_SPEED',
    payload: {
      speed,
    },
  };
}

export function setAutopilotPgain(gain) {
  return {
    type: 'SET_AUTOPILOT_P_GAIN',
    payload: {
      gain,
    },
  };
}

export function setAutopilotIgain(gain) {
  return {
    type: 'SET_AUTOPILOT_I_GAIN',
    payload: {
      gain,
    },
  };
}

export function setAutopilotDgain(gain) {
  return {
    type: 'SET_AUTOPILOT_D_GAIN',
    payload: {
      gain,
    },
  };
}

export function toggleAutopilot() {
  return {
    type: 'TOGGLE_AUTOPILOT',
  };
}
