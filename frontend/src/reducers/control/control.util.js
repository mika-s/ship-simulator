import { vesselControlMode } from '../../util/enums';
import { headingController, speedController, autopilotAlloc } from '../control/autopilot';

export function calculateControllerDemands(control, estimated) {
  let forces = { surge: 0.0, sway: 0.0, yaw: 0.0 };
  let controllerOutput;
  const data = {};

  switch (control.mode) {
    case vesselControlMode.AUTOPILOT:
      controllerOutput = headingController(
        control.autopilot,
        estimated.position.heading,
        estimated.velocity.r,
      );
      ({ yawForce: forces.yaw } = controllerOutput);
      data.summedHeadingError = controllerOutput.summedHeadingError;
      data.pid = controllerOutput.pid;

      forces.surge = speedController(
        control.autopilot,
        estimated.velocity.u,
        estimated.acceleration.u,
      );
      break;
    default:
      forces = { surge: 0.0, sway: 0.0, yaw: 0.0 };
      data.summedHeadingError = 0.0;
      data.pid = { p: 0.0, i: 0.0, d: 0.0 };
      break;
  }

  return { forces, data };
}

export function calculateThrusterDemands(controllerData, control, thrusters, uiThrusters) {
  let demands = [];

  switch (control.mode) {
    case vesselControlMode.STANDBY:
      for (let thrIdx = 0; thrIdx < uiThrusters.length; thrIdx += 1) {
        demands.push({
          pitch: 0.0,
          rpm: 0.0,
          azimuth: 0.0,
        });
      }
      break;
    case vesselControlMode.TEST:
      for (let thrIdx = 0; thrIdx < uiThrusters.length; thrIdx += 1) {
        demands.push({
          pitch: uiThrusters[thrIdx].demand.pitch,
          rpm: uiThrusters[thrIdx].demand.rpm,
          azimuth: uiThrusters[thrIdx].demand.azimuth,
        });
      }
      break;
    case vesselControlMode.LEVER:
      for (let thrIdx = 0; thrIdx < uiThrusters.length; thrIdx += 1) {
        demands.push({
          pitch: uiThrusters[thrIdx].demand.pitch,
          rpm: uiThrusters[thrIdx].demand.rpm,
          azimuth: uiThrusters[thrIdx].demand.azimuth,
        });
      }
      break;
    case vesselControlMode.AUTOPILOT:
      demands = autopilotAlloc(
        controllerData.forces.yaw,
        control.autopilot.maxRudderAngle,
        thrusters,
      );
      break;
    default:
      throw new Error(`Invalid control mode ${control.mode}`);
  }

  return demands;
}
