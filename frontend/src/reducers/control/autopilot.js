import { wrapTo0To360, wrapToPipi } from '../../util/kinematics.util';

const {
  PI, max, min, abs, sign,
} = Math;

/**
* Find needed control force in heading.
* @param {number} autopilot         The autopilot object.
* @param {number} heading           The vessel's heading.
* @param {number} rot               The vessel's rot.
* @returns {object} An object containing:
*                   - The control force in yaw.
*                   - The summed heading error.
*                   - An object containing p, i and d forces.
*/
export function headingController(autopilot, heading, rot) {
  const { sector, maxI } = autopilot.controllers.headingPid.antiWindup;
  const desiredRot = 0.0;
  const iDieConstant = 15;
  const iDieSector = 2.0;
  const maxIadjusted = maxI / autopilot.controllers.headingPid.gain.i;

  let headingError;
  let summedHeadingError;
  let derivativeHeadingError;

  if (autopilot.speed !== 0 && autopilot.active) {
    const error = autopilot.heading - heading;
    const derror = desiredRot - rot;

    // Find shortest distance.
    const ccw = error > 0 ? error - 360.0 : error;
    const cw = error > 0 ? error : 360 + error;
    const chosenError = abs(ccw) < Math.abs(cw) ? ccw : cw;

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

    summedHeadingError = min(summedHeadingError, maxIadjusted);
    summedHeadingError = max(summedHeadingError, -maxIadjusted);

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
  const yawForce = p + i + d;

  return {
    yawForce,
    summedHeadingError,
    pid: { p, i, d },
  };
}

/**
* Find needed control force in surge to keep wanted vessel speed.
* @param {number} autopilot         The autopilot object.
* @param {number} speed             The vessel's speed.
* @param {number} acceleration      The vessel's acceleration.
* @returns {number} The control force in surge.
*/
export function speedController(autopilot, speed, acceleration) {
  const { sector, maxI } = autopilot.controllers.speedPid.antiWindup;
  const desiredAcceleration = 0.0;
  const iDieConstant = 5;
  const iDieSector = 0.2;
  const maxIadjusted = maxI / autopilot.controllers.speedPid.gain.i;

  let speedError;
  let summedSpeedError;
  let derivativeSpeedError;

  if (autopilot.speed !== 0 && autopilot.active) {
    const error = autopilot.speed - speed;
    const derror = desiredAcceleration - acceleration;

    speedError = error;
    derivativeSpeedError = derror;
  } else {
    speedError = 0.0;
    summedSpeedError = 0.0;
    derivativeSpeedError = 0.0;
  }

  // Anti-windup
  if (-sector < speedError && speedError < sector) {
    summedSpeedError = autopilot.controllers.speedPid.summedError + speedError;

    summedSpeedError = min(summedSpeedError, maxIadjusted);
    summedSpeedError = max(summedSpeedError, -maxIadjusted);

    // Let I-term die out over time.
    if (summedSpeedError > 0 && abs(speedError) < iDieSector) {
      summedSpeedError = max(0, summedSpeedError - iDieConstant);
    } else if (summedSpeedError < 0 && abs(speedError) < iDieSector) {
      summedSpeedError = min(0, summedSpeedError + iDieConstant);
    }
  } else {
    summedSpeedError = 0.0;
  }

  const p = autopilot.controllers.speedPid.gain.p * speedError;
  const i = autopilot.controllers.speedPid.gain.i * summedSpeedError;
  const d = autopilot.controllers.speedPid.gain.d * derivativeSpeedError;
  const surgeForce = p + i + d;

  return {
    surgeForce,
    summedSpeedError,
    pid: { p, i, d },
  };
}

/**
* Allocate demands to the thrusters depending on the heading control force.
* @param {number}      surgeControlForce    The surge control force.
* @param {number}      headingControlForce  The heading control force.
* @param {number}      maxRudderAngle       Maximum rudder angle.
* @param {Object[]}    thrusters            An array of thruster objects.
* @returns {Object} The demands for all the thrusters.
*/
export function autopilotAlloc(surgeControlForce, headingControlForce, maxRudderAngle, thrusters) {
  const rudderGain = -0.11;
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
      let rpm;
      let pitch;
      let azimuth = rudderGain * headingControlForce;
      azimuth = max(-maxRudderAngle, azimuth);
      azimuth = min(maxRudderAngle, azimuth);
      azimuth = wrapTo0To360(azimuth);

      if (thruster.controlType === 'rpm') {
        pitch = 0.0;
        rpm = sign(surgeControlForce) * ((abs(surgeControlForce) / thruster.maxForce.positive)
          ** (1 / thruster.rpmExponent.positive));

        rpm = min(1.0, rpm);
        rpm = max(0.0, rpm);
      } else {
        rpm = 0.0;
        pitch = sign(surgeControlForce) * ((abs(surgeControlForce) / thruster.maxForce.positive)
          ** (1 / thruster.pitchExponent.positive));

        pitch = min(1.0, pitch);
        pitch = max(0.0, pitch);
      }

      demands.push({
        pitch,
        rpm,
        azimuth,
      });
    } else {
      throw new Error('Illegal thruster type');
    }
  }

  return demands;
}
