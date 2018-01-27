import { transformTo0To360, transformToPipi } from '../../util/kinematics.util';

const { PI } = Math;

function headingController(autopilot, gyroHeading) {
  const antiWindupLimit = 30;
  const antiWindupMax = 500;

  const derivativeHeadingError = 0.0;
  let headingError;

  if (autopilot.speed !== 0) {
    const error = autopilot.heading - gyroHeading;

    // Find shortest distance.
    const ccw = error > 0 ? error - 360.0 : error;
    const cw = error > 0 ? error : 360 + error;
    const chosenError = Math.abs(ccw) < Math.abs(cw) ? ccw : cw;
    // console.log(chosenError);

    const errorInRads = chosenError * (PI / 180.0);
    headingError = transformToPipi(errorInRads).angle * (180.0 / PI);
  } else {
    headingError = 0.0;
  }

  let summedHeadingError;

  // Anti-windup
  if (-antiWindupLimit < headingError && headingError < antiWindupLimit) {
    summedHeadingError = autopilot.controllers.headingPid.summedError + headingError;
    if (summedHeadingError > antiWindupMax) summedHeadingError = antiWindupMax;
  } else {
    summedHeadingError = 0.0;
  }

  // console.log('summed: ', summedHeadingError);

  const force =
    (autopilot.controllers.headingPid.gain.p * headingError) +
    (autopilot.controllers.headingPid.gain.i * summedHeadingError) +
    (autopilot.controllers.headingPid.gain.d * derivativeHeadingError);

  return { force, summedHeadingError };
}

function autopilotAlloc(headingControlForce, maxRudderAngle, thrusters) {
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
      let azimuth = -0.1 * headingControlForce;
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

export function calculateAutopilotDemand(control, gyrocompasses, gpses, thrusters) {
  const headingData = headingController(control.autopilot, gyrocompasses[0].heading);
  const demands = autopilotAlloc(headingData.force, control.autopilot.maxRudderAngle, thrusters);

  return { demands, summedHeadingError: headingData.summedHeadingError };
}
