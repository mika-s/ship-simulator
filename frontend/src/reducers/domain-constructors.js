import ThrUtil from './ship/ThrusterUtil';
import SnsUtil from './ship/SensorUtil';
import RfsUtil from './ship/ReferencesystemUtil';

function Gyrocompass(data) {
  const { number, initialHeading } = data;
  SnsUtil.assertGyrocompassConstructorInput(number, initialHeading);

  this.number = number;
  this.heading = initialHeading;
}

function MRU(data) {
  const { number, initialRoll, initialPitch } = data;
  SnsUtil.assertMruConstructorInput(number, initialRoll, initialPitch);

  this.number = number;
  this.roll = initialRoll;
  this.pitch = initialPitch;
}

function Windsensor(data) {
  const { number, initialSpeed, initialDirection } = data;
  SnsUtil.assertWindsensorConstructorInput(number, initialSpeed, initialDirection);

  this.number = number;
  this.speed = initialSpeed;
  this.direction = initialDirection;
}

function GPS(data) {
  const { number, initialPosition } = data;
  RfsUtil.assertGpsConstructorInput(number, initialPosition);

  this.number = number;
  this.position = {
    latitude: initialPosition.latitude,
    longitude: initialPosition.longitude,
  };
}

function Thruster(data) {
  const {
    number, name, thrusterType, controlType,
    maxPower, location, risetimes, misc = { maxRudderAngle: 45.0 },
    pitchExponent = { positive: 0.0, negative: 0.0 },
    pitchPowerExponent = { positive: 0.0, negative: 0.0 },
  } = data;
  ThrUtil.assertThrusterConstructorInput(
    number, name, thrusterType, controlType,
    maxPower, location, risetimes, misc,
    pitchExponent, pitchPowerExponent,
  );

  this.number = number;
  this.name = name;
  this.thrusterType = thrusterType;
  this.controlType = controlType;
  this.maxPower = maxPower;
  this.location = location;
  this.misc = misc;
  this.risetimes = ThrUtil.normalizeRisetimes(risetimes, thrusterType);
  this.pitchExponent = pitchExponent;
  this.pitchPowerExponent = pitchPowerExponent;
  this.rpmExponent = controlType === 'rpm' ? { positive: 2.0, negative: 2.0 } : { positive: 0.0, negative: 0.0 };
  this.rpmPowerExponent = controlType === 'rpm' ? { positive: 3.0, negative: 3.0 } : { positive: 0.0, negative: 0.0 };

  this.maxForce =
    ThrUtil.calculateMaxForce(thrusterType, maxPower);

  this.force = 0.0;
  this.power = 0.0;

  this.demand = {
    rpm: 0.0,
    pitch: 0.0,
    azimuth: thrusterType === 'tunnel' ? 90.0 : 0.0,
  };

  this.feedback = {
    rpm: 0.0,
    pitch: 0.0,
    azimuth: thrusterType === 'tunnel' ? 90.0 : 0.0,
  };
}

function UiThruster(data) {
  const { number } = data;
  ThrUtil.assertUiThrusterConstructorInput(number);

  this.number = number;
  this.demand = { rpm: 0.0, pitch: 0.0, azimuth: 0.0 };
}

export {
  Gyrocompass,
  MRU,
  Windsensor,
  GPS,
  Thruster,
  UiThruster,
};
