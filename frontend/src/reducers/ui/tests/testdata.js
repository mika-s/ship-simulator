import UiThruster from '../../constructors/uithruster';

const data = [{ number: 1 }, { number: 2 }, { number: 3 }];

const thrusters = [];
for (let thrIdx = 0; thrIdx < data.length; thrIdx += 1) {
  thrusters.push(new UiThruster(data[thrIdx]));
}

const mockInitialVesselModel = {
  model: {
    position: {
      latitude: 50.0,
      longitude: 4.0,
      heading: 123.4,
    },
  },
  thrusters,
};

export default mockInitialVesselModel;
