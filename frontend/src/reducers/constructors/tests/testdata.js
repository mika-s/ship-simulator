const thrusterData = [
  {
    number: 1,
    name: 'OK RPM Tunnel',
    thrusterType: 'tunnel',
    controlType: 'rpm',
    maxPower: { positive: 800.0, negative: 800.0 },
    location: { x: 45.0, y: 0.0 },
    risetimes: {
      rpm: {
        positive: 10.0,
        negative: -10.0,
      },
    },
  },
  {
    number: 2,
    name: 'NOT OK RPM Tunnel',
    thrusterType: 'tunnelasd',
    controlType: 'rpm',
    maxPower: { positive: 800.0, negative: 800.0 },
    location: { x: 45.0, y: 0.0 },
    risetimes: {
      rpm: {
        positive: 10.0,
        negative: -10.0,
      },
    },
  },
  {
    number: 3,
    name: 'OK RPM propeller',
    thrusterType: 'propeller',
    controlType: 'rpm',
    maxPower: { positive: 1800.0, negative: 800.0 },
    location: { x: -45.0, y: 0.0 },
    risetimes: {
      rpm: {
        positive: 10.0,
        negative: -10.0,
      },
    },
  },
  {
    number: 4,
    name: 'NOT OK RPM propeller',
    thrusterType: 'propeller',
    controlType: 'rmp',
    maxPower: { positive: 1800.0, negative: 800.0 },
    location: { x: -45.0, y: 0.0 },
    risetimes: {
      rpm: {
        positive: 10.0,
        negative: -10.0,
      },
    },
  },
  {
    number: 5,
    name: 'OK pitch azimuth',
    thrusterType: 'azimuth',
    controlType: 'pitch',
    maxPower: { positive: 1800.0, negative: 800.0 },
    pitchExponent: { positive: 1.5, negative: 1.5 },
    pitchPowerExponent: { positive: 2.5, negative: 2.5 },
    location: { x: -45.0, y: 5.0 },
    risetimes: {
      pitch: {
        positive: 10.0,
        negative: -10.0,
      },
      azimuth: {
        positive: 20.00,
        negative: -20.00,
      },
    },
  },
  {
    number: 6,
    name: 'NOT OK pitch azimuth',
    thrusterType: 'azimuth',
    controlType: 'pit',
    maxPower: { positive: 1800.0, negative: 800.0 },
    pitchExponent: { positive: 1.5, negative: 1.5 },
    pitchPowerExponent: { positive: 2.5, negative: 2.5 },
    location: { x: -450.0, y: 5.0 },
    risetimes: {
      pitch: {
        positive: 10.0,
        negative: -10.0,
      },
      azimuth: {
        positive: 20.00,
        negative: -20.00,
      },
    },
  },
  {
    number: 7,
    name: 'NOT OK pitch azimuth',
    thrusterType: 'azimuth',
    controlType: 'pitch',
    maxPower: { positive: 1800.0, negative: 800.0 },
    pitchPowerExponent: { positive: 2.5, negative: 2.5 },
    location: { x: -45.0, y: 5.0 },
    risetimes: {
      pitch: {
        positive: 10.0,
        negative: -10.0,
      },
      azimuth: {
        positive: 20.00,
        negative: -20.00,
      },
    },
  },
];

export default thrusterData;
