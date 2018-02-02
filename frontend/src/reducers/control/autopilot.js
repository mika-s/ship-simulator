import { wrapTo0To360, wrapToPipi } from '../../util/kinematics.util';

const {
  PI, max, min, abs,
} = Math;

/**
* Find needed control force in heading.
* @param {number} autopilot         - The autopilot object.
* @param {number} heading           - The vessel's heading.
* @param {number} rot               - The vessel's rot.
* @returns {object} An object containing:
*                   - the forces in surge, sway and yaw
*                   - the summed heading error
*                   - an object containing p, i and d forces.
*/
export function headingController(autopilot, heading, rot) {
  const { sector, maxI } = autopilot.controllers.headingPid.antiWindup;
  const desiredRot = 0.0;
  const iDieConstant = 15;
  const iDieSector = 2.0;

  let headingError;
  let summedHeadingError;
  let derivativeHeadingError;

  if (autopilot.speed !== 0 && autopilot.active) {
    const error = autopilot.heading - heading;
    const derror = desiredRot - rot;

    // Find shortest distance.
    const ccw = error > 0 ? error - 360.0 : error;
    const cw = error > 0 ? error : 360 + error;
    const chosenError = Math.abs(ccw) < Math.abs(cw) ? ccw : cw;

    const errorInRads = chosenError * (PI / 180.0);
    headingError = wrapToPipi(errorInRads).angle * (180.0 / PI);
    derivativeHeadingError = derror;
  } else {
    headingError = 0.0;
    summedHeadingError = 0.0;
    derivativeHeadingError = 0.0;
  }

  // Anti-windup
  if (-sector < headingError && headingError < sector) {
    summedHeadingError = autopilot.controllers.headingPid.summedError + headingError;

    summedHeadingError = min(summedHeadingError, maxI);
    summedHeadingError = max(summedHeadingError, -maxI);

    // Let I-term die out over time.
    if (summedHeadingError > 0 && abs(headingError) < iDieSector) {
      summedHeadingError = max(0, summedHeadingError - iDieConstant);
    } else if (summedHeadingError < 0 && abs(headingError) < iDieSector) {
      summedHeadingError = min(0, summedHeadingError + iDieConstant);
    }
  } else {
    summedHeadingError = 0.0;
  }

  const p = autopilot.controllers.headingPid.gain.p * headingError;
  const i = autopilot.controllers.headingPid.gain.i * summedHeadingError;
  const d = autopilot.controllers.headingPid.gain.d * derivativeHeadingError;
  const force = p + i + d;

  const forces = { surge: 0.0, sway: 0.0, yaw: force };

  return {
    forces,
    summedHeadingError,
    pid: { p, i, d },
  };
}

/**
* Allocate demands to the thrusters depending on the heading control force.
* @param {number}      headingControlForce  - The heading control force.
* @param {number}      maxRudderAngle       - Maximum rudder angle.
* @param {Object[]}    thrusters            - An array of thruster objects.
* @returns {Object} The demands for all the thrusters.
*/
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
      azimuth = wrapTo0To360(azimuth);

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
