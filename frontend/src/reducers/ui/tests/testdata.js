import UiThruster from '../../constructors/uithruster';

const data = [
  { number: 1 },
  { number: 2 },
  { number: 3 },
];

const thrusters = [];

for (let thrIdx = 0; thrIdx < data.length; thrIdx += 1) {
  thrusters.push(new UiThruster(data[thrIdx]));
}

export default thrusters;
