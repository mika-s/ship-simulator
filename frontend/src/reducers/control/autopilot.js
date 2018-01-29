import { transformTo0To360, transformToPipi } from '../../util/kinematics.util';

const { PI } = Math;

export function headingController(autopilot, estimatedHeading, estimatedRot) {
  const antiWindupLimit = 30;
  const antiWindupMax = 500;
  const desiredRot = 0.0;

  let headingError;
  let derivativeHeadingError;

  if (autopilot.speed !== 0) {
    const error = autopilot.heading - estimatedHeading;
    const derror = desiredRot - estimatedRot;

    // Find shortest distance.
    const ccw = error > 0 ? error - 360.0 : error;
    const cw = error > 0 ? error : 360 + error;
    const chosenError = Math.abs(ccw) < Math.abs(cw) ? ccw : cw;

    const errorInRads = chosenError * (PI / 180.0);
    headingError = transformToPipi(errorInRads).angle * (180.0 / PI);
    derivativeHeadingError = derror;
  } else {
    headingError = 0.0;
    derivativeHeadingError = 0.0;
  }

  let summedHeadingError;

  // Anti-windup
  if (-antiWindupLimit < headingError && headingError < antiWindupLimit) {
    summedHeadingError = autopilot.controllers.headingPid.summedError + headingError;
    if (summedHeadingError > antiWindupMax) summedHeadingError = antiWindupMax;
  } else {
    summedHeadingError = 0.0;
  }

  const force =
    (autopilot.controllers.headingPid.gain.p * headingError) +
    (autopilot.controllers.headingPid.gain.i * summedHeadingError) +
    (autopilot.controllers.headingPid.gain.d * derivativeHeadingError);

  const forces = { surge: 0.0, sway: 0.0, yaw: force };

  return { forces, summedHeadingError };
}

export function autopilotAlloc(headingControlForce, maxRudderAngle, thrusters) {
  const rudderGain = -0.1;
  const demands = [];

  for (let thrIdx = 0; thrIdx < thrusters.length; thrIdx += 1) {
    const thruster = thrusters[thrIdx];

    if (thruster.thrusterType === 'tunnel') {
      demands.push({
        pitch: 0.0,
        rpm: 0.0,
        azimuth: 90.0,
      });
    } else if (thruster.thrusterType === 'azimuth' || thruster.thrusterType === 'propeller') {
      let azimuth = rudderGain * headingControlForce;
      azimuth = Math.max(-maxRudderAngle, azimuth);
      azimuth = Math.min(maxRudderAngle, azimuth);
      azimuth = transformTo0To360(azimuth);

      demands.push({
        pitch: thruster.controlType === 'pitch' ? 1.0 : 0.0,
        rpm: thruster.controlType === 'rpm' ? 1.0 : 0.0,
        azimuth,
      });
    } else {
      throw new Error('Illegal thruster type');
    }
  }

  return demands;
}
