import UiThruster from '../../constructors/uithruster';

const initialController = {
  autopilot: {
    controllers: {
      headingPid: { gain: { p: 0.0, i: 0.0, d: 0.0 } },
      speedPid: { gain: { p: 0.0, i: 0.0, d: 0.0 } },
    },
  },
};

const initialEstimator = {
  alphabeta: {
    alpha: 0.3,
    beta: 0.05,
  },
};

const data = [{ number: 1 }, { number: 2 }, { number: 3 }];

const thrusters = [];
for (let thrIdx = 0; thrIdx < data.length; thrIdx += 1) {
  thrusters.push(new UiThruster(data[thrIdx]));
}

const initialVesselModel = {
  model: {
    position: {
      latitude: 50.0,
      longitude: 4.0,
      heading: 123.4,
    },
  },
  thrusters,
};

export { initialVesselModel, initialController, initialEstimator };
