export function setThrusterDemand(number, type, demand) {
  return {
    type: 'SET_THRUSTER_DEMAND',
    payload: {
      number,
      type,
      demand,
    },
  };
}
