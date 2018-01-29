const controllerdata = {
  autopilot: {
    controllers: {
      headingPid: {
        gain: {
          p: 1,
          i: 0.001,
          d: 1,
        },
      },
      speedPid: {
        gain: {
          p: 5,
          i: 1,
          d: 1,
        },
      },
    },
  },
};

export default controllerdata;
