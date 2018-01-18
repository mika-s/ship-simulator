export function setControlMode(mode) {
  return {
    type: 'SET_CONTROL_MODE',
    payload: {
      mode,
    },
  };
}
