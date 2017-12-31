function getForces(thruster) {
  let newForce;

  if (thruster.rpmDemand >= 0.0) {
    newForce = thruster.maxForcePositive *
      (thruster.pitchDemand ** thruster.pitchExponent.positive) *
      (thruster.rpmDemand ** thruster.rpmExponent.positive);
  } else {
    newForce = thruster.maxForceNegative *
      (thruster.pitchDemand ** thruster.pitchExponent.negative) *
      (thruster.rpmDemand ** thruster.rpmExponent.negative);
  }

  return newForce;
}

function getPower(thruster) {
  let newPower;

  if (thruster.rpmDemand >= 0.0) {
    newPower = thruster.maxPowerPositive * (thruster.rpmDemand ** 3.0);
  } else {
    newPower = thruster.maxPowerNegative * (thruster.rpmDemand ** 3.0);
  }

  return newPower;
}

export default function thrusterReducer(state, action) {
  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        force: getForces(state),
        power: getPower(state),
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        force: 0.0,
        power: 0.0,
      };
    default:
      return state;
  }
}
