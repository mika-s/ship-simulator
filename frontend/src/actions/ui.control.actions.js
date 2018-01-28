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

export function setAlphaForHeading(alpha) {
  return {
    type: 'SET_ALPHA_FOR_HEADING',
    payload: {
      alpha,
    },
  };
}

export function setBetaForHeading(beta) {
  return {
    type: 'SET_BETA_FOR_HEADNG',
    payload: {
      beta,
    },
  };
}

export function toggleAutopilot() {
  return {
    type: 'TOGGLE_AUTOPILOT',
  };
}
