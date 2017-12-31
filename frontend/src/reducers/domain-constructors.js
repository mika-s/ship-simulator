import ThrUtil from './ship/ThrusterUtil';

function Gyrocompass(number, initialHeading) {
  this.number = number;
  this.heading = initialHeading;
}

function MRU(number, initialRoll, initialPitch) {
  this.number = number;
  this.roll = initialRoll;
  this.pitch = initialPitch;
}

function Windsensor(number, initialSpeed, initialDirection) {
  this.number = number;
  this.speed = initialSpeed;
  this.direction = initialDirection;
}

function GPS(number, initialLatitude, initialLongitude) {
  this.number = number;
  this.position = {
    latitude: initialLatitude,
    longitude: initialLongitude,
  };
}

function Thruster(
  number, name, thrusterType, controlType,
  maxPowerPositive, maxPowerNegative,
  xPos, yPos, pitchExponentPositive = 0.0, pitchExponentNegative = 0.0,
) {
  ThrUtil.assertConstructorInput(
    number, name, thrusterType, controlType,
    maxPowerPositive, maxPowerNegative,
    xPos, yPos, pitchExponentPositive, pitchExponentNegative,
  );

  this.number = number;
  this.name = name;
  this.thrusterType = thrusterType;
  this.controlType = controlType;
  this.maxPowerPositive = maxPowerPositive;
  this.maxPowerNegative = maxPowerNegative;
  this.xPos = xPos;
  this.yPos = yPos;

  this.pitchExponent = { positive: pitchExponentPositive, negative: pitchExponentNegative };
  this.rpmExponent = controlType === 'rpm' ? { positive: 2.0, negative: 2.0 } : { positive: 0.0, negative: 0.0 };

  const maxForces =
    ThrUtil.calculateMaxForce(thrusterType, maxPowerPositive, maxPowerNegative);

  this.maxForcePositive = maxForces.maxForcePositive;
  this.maxForceNegative = maxForces.maxForceNegative;

  this.force = 0.0;
  this.rpmDemand = 0.0;
  this.pitchDemand = 0.0;
  this.azimuthDemand = thrusterType === 'tunnel' ? 90.0 : 0.0;
}

export {
  Gyrocompass,
  MRU,
  Windsensor,
  GPS,
  Thruster,
};
