import { vesselControlMode } from '../../util/enums';
import { headingController, speedController, autopilotAlloc } from '../control/autopilot';

/**
* Calculate the controller demands.
* @param {Object}      control    The control object.
* @param {Object}      estimated  The estimator object.
* @returns {Object} The controller demands in surge, sway and heading.
*/
export function calculateControllerDemands(control, estimated) {
  let forces = { surge: 0.0, sway: 0.0, yaw: 0.0 };
  let controllerOutputSurge;
  let controllerOutputYaw;
  const data = {};

  switch (control.mode) {
    case vesselControlMode.AUTOPILOT:
      controllerOutputYaw = headingController(
        control.autopilot,
        estimated.position.heading,
        estimated.velocity.r,
      );
      ({ yawForce: forces.yaw } = controllerOutputYaw);
      data.summedHeadingError = controllerOutputYaw.summedHeadingError;
      data.headingPid = controllerOutputYaw.pid;

      controllerOutputSurge = speedController(
        control.autopilot,
        estimated.velocity.u,
        estimated.acceleration.ud,
      );
      ({ surgeForce: forces.surge } = controllerOutputSurge);
      data.summedSpeedError = controllerOutputSurge.summedSpeedError;
      data.speedPid = controllerOutputSurge.pid;
      break;
    default:
      forces = { surge: 0.0, sway: 0.0, yaw: 0.0 };
      data.summedHeadingError = 0.0;
      data.summedSpeedError = 0.0;
      data.headingPid = { p: 0.0, i: 0.0, d: 0.0 };
      data.speedPid = { p: 0.0, i: 0.0, d: 0.0 };
      break;
  }

  return { forces, data };
}

/**
* Calculate thruster demands from control forces.
* @param {number}      controllerData    Data from the controller.
* @param {number}      control           The controller object.
* @param {Object[]}    thrusters         An array of thruster objects.
* @param {Object[]}    uiThrusters       An array of UI thruster objects.
* @returns {Object} The demands for all the thrusters.
*/
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
        controllerData.forces.surge,
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
