import { motion, vesselControlMode } from '../../util/enums';
import UiThruster from '../constructors/uithruster';

const min = {
  heading: 0,
  gpsspeed: 0,
  position: 49.9,
  position2: 3.9,
  thrusters: 0,
  rollpitch: -5.0,
  alphabetaHeading: 0.0,
  alphabetaHeading2: 0.0,
  autopilotHeadingPid: -50.0,
  autopilotHeadingPid2: -3.0,
  autopilotHeadingPid3: -50.0,
  autopilotSpeedPid: -50.0,
  autopilotSpeedPid2: -100.0,
  autopilotSpeedPid3: -50.0,
};

const max = {
  heading: 360,
  gpsspeed: 10,
  position: 50.1,
  position2: 4.1,
  thrusters: 0,
  rollpitch: 5.0,
  alphabetaHeading: 360.0,
  alphabetaHeading2: 100.0,
  autopilotHeadingPid: 50.0,
  autopilotHeadingPid2: 3.0,
  autopilotHeadingPid3: 50.0,
  autopilotSpeedPid: 50.0,
  autopilotSpeedPid2: 100.0,
  autopilotSpeedPid3: 50.0,
};

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
        min,
        max,
      },
      2: {
        type: 'gpsspeed',
        isAutoAxis: true,
        min,
        max,
      },
      3: {
        type: 'position',
        isAutoAxis: true,
        min,
        max,
      },
      4: {
        type: 'thrusters',
        isAutoAxis: true,
        min,
        max,
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
      controllers: {
        headingPid: {
          gain: { p: 0.0, i: 0.0, d: 0.0 },
        },
        speedPid: {
          gain: { p: 0.0, i: 0.0, d: 0.0 },
        },
      },
    },
  },
  estimator: {
    alphabeta: {
      alpha: {
        latitude: 0.0,
        longitude: 0.0,
        heading: 0.0,
      },
      beta: {
        latitude: 0.0,
        longitude: 0.0,
        heading: 0.0,
      },
    },
  },
};

/**
* Get the initial state for the redux store for the ui section.
* Merges hardcoded values with the values from the settings files.
* @param {Object}      initialVessel       The initial vessel values from the settings file.
* @param {Object}      initialController   The initial controller values from the settings file.
* @param {Object}      initialEstimator    The initial estimator values from the settings file.
* @returns {Object} The initial state for the ui section.
*/
function getInitialState(initialVessel, initialController, initialEstimator) {
  uiInitialState.position = initialVessel.model.position;

  for (let thrIdx = 0; thrIdx < initialVessel.thrusters.length; thrIdx += 1) {
    uiInitialState.thrusters.push(new UiThruster(initialVessel.thrusters[thrIdx]));
  }

  uiInitialState.estimator.alphabeta.alpha = initialEstimator.alphabeta.alpha;
  uiInitialState.estimator.alphabeta.beta = initialEstimator.alphabeta.beta;

  uiInitialState.control.autopilot.controllers.headingPid.gain =
    initialController.autopilot.controllers.headingPid.gain;

  uiInitialState.control.autopilot.controllers.speedPid.gain =
    initialController.autopilot.controllers.speedPid.gain;

  return uiInitialState;
}

export default getInitialState;
