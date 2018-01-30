import { motion, vesselControlMode } from '../../util/enums';
import UiThruster from '../constructors/uithruster';

const uiInitialState = {
  thrusters: [],
  current: {
    speed: 0.0,
    direction: 0.0,
  },
  wind: {
    speed: 0.0,
    direction: 0.0,
  },
  position: {
    latitude: 0.0,
    longitude: 0.0,
    heading: 0.0,
  },
  dashboard: {
    panes: {
      1: {
        type: 'heading',
        isAutoAxis: true,
        min: {
          heading: 0,
          gpsspeed: 0,
          position: 49.9,
          position2: 3.9,
          thrusters: 0,
          rollpitch: -5.0,
          alphabetaHeading: 0.0,
          alphabetaHeading2: 0.0,
          autopilotPid: -50.0,
          autopilotPid2: -3.0,
          autopilotPid3: -50.0,
        },
        max: {
          heading: 360,
          gpsspeed: 10,
          position: 50.1,
          position2: 4.1,
          thrusters: 0,
          rollpitch: 5.0,
          alphabetaHeading: 360.0,
          alphabetaHeading2: 100.0,
          autopilotPid: 50.0,
          autopilotPid2: 3.0,
          autopilotPid3: 50.0,
        },
      },
      2: {
        type: 'gpsspeed',
        isAutoAxis: true,
        min: {
          heading: 0,
          gpsspeed: 0,
          position: 49.9,
          position2: 3.9,
          thrusters: 0,
          rollpitch: -5.0,
          alphabetaHeading: 0.0,
          alphabetaHeading2: 0.0,
          autopilotPid: -50.0,
          autopilotPid2: -3.0,
          autopilotPid3: -50.0,
        },
        max: {
          heading: 360,
          gpsspeed: 10,
          position: 50.1,
          position2: 4.1,
          thrusters: 0,
          rollpitch: 5.0,
          alphabetaHeading: 360.0,
          alphabetaHeading2: 100.0,
          autopilotPid: 50.0,
          autopilotPid2: 3.0,
          autopilotPid3: 50.0,
        },
      },
      3: {
        type: 'position',
        isAutoAxis: true,
        min: {
          heading: 0,
          gpsspeed: 0,
          position: 49.9,
          position2: 3.9,
          thrusters: 0,
          rollpitch: -5.0,
          alphabetaHeading: 0.0,
          alphabetaHeading2: 0.0,
          autopilotPid: -50.0,
          autopilotPid2: -3.0,
          autopilotPid3: -50.0,
        },
        max: {
          heading: 360,
          gpsspeed: 10,
          position: 50.1,
          position2: 4.1,
          thrusters: 0,
          rollpitch: 5.0,
          alphabetaHeading: 360.0,
          alphabetaHeading2: 100.0,
          autopilotPid: 50.0,
          autopilotPid2: 3.0,
          autopilotPid3: 50.0,
        },
      },
      4: {
        type: 'thrusters',
        isAutoAxis: true,
        min: {
          heading: 0,
          gpsspeed: 0,
          position: 49.9,
          position2: 3.9,
          thrusters: 0,
          rollpitch: -5.0,
          alphabetaHeading: 0.0,
          alphabetaHeading2: 0.0,
          autopilotPid: -50.0,
          autopilotPid2: -3.0,
          autopilotPid3: -50.0,
        },
        max: {
          heading: 360,
          gpsspeed: 10,
          position: 50.1,
          position2: 4.1,
          thrusters: 0,
          rollpitch: 5.0,
          alphabetaHeading: 360.0,
          alphabetaHeading2: 100.0,
          autopilotPid: 50.0,
          autopilotPid2: 3.0,
          autopilotPid3: 50.0,
        },
      },
    },
  },
  map: {
    zoomlevel: 5,
    motion: motion.TRUE,
  },
  control: {
    mode: vesselControlMode.AUTOPILOT,
    autopilot: {
      active: false,
      heading: 0.0,
      speed: 0.0,
    },
  },
  estimator: {
    alphabeta: {
      alpha: 0.0,
      beta: 0.0,
    },
  },
};

function getInitialState(initialVessel, initialEstimator) {
  uiInitialState.position = initialVessel.model.position;

  for (let thrIdx = 0; thrIdx < initialVessel.thrusters.length; thrIdx += 1) {
    uiInitialState.thrusters.push(new UiThruster(initialVessel.thrusters[thrIdx]));
  }

  uiInitialState.estimator.alphabeta.alpha = initialEstimator.alphabeta.alpha;
  uiInitialState.estimator.alphabeta.beta = initialEstimator.alphabeta.beta;

  return uiInitialState;
}

export default getInitialState;
