import { vesselControlMode } from '../../util/enums';
import { calculateAutopilotDemand } from '../control/autopilot';

export function calculateDemands(control, gyrocompasses, gpses, thrusters, uiThrusters) {
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
      demands = calculateAutopilotDemand(control, gyrocompasses, gpses, thrusters);
      break;
    default:
      throw new Error(`Invalid control mode ${control.mode}`);
  }

  return demands;
}
