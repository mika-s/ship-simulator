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
