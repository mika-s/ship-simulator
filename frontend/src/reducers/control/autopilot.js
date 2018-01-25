import { transformTo0To360 } from '../../util/kinematics.util';

export function calculateAutopilotDemand(control, gyrocompasses, gpses, thrusters) {
  const demands = [];

  // Controller
  const headingError = control.autopilot.speed !== 0 ?
    control.autopilot.heading - gyrocompasses[0].heading : 0;

  const speedError = control.autopilot.speed !== 0 ?
    control.autopilot.speed - gpses[0].speed : 0;

  // const headingControlForce = control.autopilot.controllers.headingPid.gain.p * headingError;
  const speedControlForce = control.autopilot.controllers.speedPid.gain.p * speedError;

  // Allocation

  // Stupid and simple alloc. "Rudder" angle proportional to the error.

  for (let thrIdx = 0; thrIdx < thrusters.length; thrIdx += 1) {
    const thruster = thrusters[thrIdx];

    if (thruster.thrusterType === 'tunnel') {
      demands.push({
        pitch: 0.0,
        rpm: 0.0,
        azimuth: 90.0,
      });
    } else if (thruster.thrusterType === 'azimuth' || thruster.thrusterType === 'propeller') {
      if (thruster.controlType === 'pitch') {
        demands.push({
          pitch: Math.min(
            speedControlForce / thruster.maxForce.positive,
            thruster.maxForce.positive,
          ),
          azimuth: transformTo0To360(Math.min(
            -0.3 * headingError,
            control.autopilot.maxRudderAngle,
          )),
        });
      } else {
        demands.push({
          rpm: Math.min(
            speedControlForce / thruster.maxForce.positive,
            thruster.maxForce.positive,
          ),
          azimuth: transformTo0To360(Math.min(
            -0.3 * headingError,
            control.autopilot.maxRudderAngle,
          )),
        });
      }
    } else {
      throw new Error('Illegal thruster type');
    }
  }

  return demands;
}
