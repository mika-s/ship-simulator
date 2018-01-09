import Gyrocompass from '../constructors/gyrocompass';
import MRU from '../constructors/mru';
import Windsensor from '../constructors/windsensor';
import GPS from '../constructors/gps';
import Thruster from '../constructors/thruster';

const shipInitialState = {
  thrusters: [],
  sensors: {
    gyrocompasses: [],
    mrus: [],
    windsensors: [],
  },
  referencesystems: {
    gpses: [],
  },
};

function getInitialState(InitialVessel) {
  for (let gcIdx = 0; gcIdx < InitialVessel.sensors.gyrocompasses.length; gcIdx += 1) {
    shipInitialState.sensors.gyrocompasses
      .push(new Gyrocompass(InitialVessel.sensors.gyrocompasses[gcIdx]));
  }

  for (let mruIdx = 0; mruIdx < InitialVessel.sensors.mrus.length; mruIdx += 1) {
    shipInitialState.sensors.mrus.push(new MRU(InitialVessel.sensors.mrus[mruIdx]));
  }

  for (let wsIdx = 0; wsIdx < InitialVessel.sensors.windsensors.length; wsIdx += 1) {
    shipInitialState.sensors.windsensors
      .push(new Windsensor(InitialVessel.sensors.windsensors[wsIdx]));
  }

  for (let gpsIdx = 0; gpsIdx < InitialVessel.referencesystems.gpses.length; gpsIdx += 1) {
    shipInitialState.referencesystems.gpses
      .push(new GPS(InitialVessel.referencesystems.gpses[gpsIdx]));
  }

  for (let thrIdx = 0; thrIdx < InitialVessel.thrusters.length; thrIdx += 1) {
    shipInitialState.thrusters.push(new Thruster(InitialVessel.thrusters[thrIdx]));
  }

  return shipInitialState;
}

export default getInitialState;
