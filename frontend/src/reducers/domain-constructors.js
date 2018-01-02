import VesselUtil from '../reducers/vesselmodel/VesselUtil';
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

function VesselModel(vesselModelInitialState, initialVessel) {
  vesselModelInitialState.dimensions = initialVessel.dimensions;
  vesselModelInitialState.model.position = initialVessel.model.position;
  vesselModelInitialState.initialPosition = initialVessel.model.position;

  vesselModelInitialState.dimensions.displacement =
    VesselUtil.calculateDisplacement(vesselModelInitialState.dimensions);

  vesselModelInitialState.mass = VesselUtil.calculateMass(
    vesselModelInitialState.dimensions.displacement,
    vesselModelInitialState.dimensions.lpp,
  );

  vesselModelInitialState.drag = VesselUtil.calculateDrag(
    vesselModelInitialState.dimensions.lpp,
    vesselModelInitialState.dimensions.breadth,
    vesselModelInitialState.dimensions.draft,
  );

  // Set optional parameters.
  if (!initialVessel.dimensions.loa) {
    vesselModelInitialState.dimensions.loa = 1.1 * initialVessel.dimensions.lpp;
  }
  if (!initialVessel.wind || (initialVessel.wind && !initialVessel.wind.frontalArea)) {
    vesselModelInitialState.wind.frontalArea = 400.0;
  }
  if (!initialVessel.wind || (initialVessel.wind && !initialVessel.wind.lateralArea)) {
    vesselModelInitialState.wind.lateralArea = 1400.0;
  }
  if (!initialVessel.wind || (initialVessel.wind && !initialVessel.wind.vesselType)) {
    vesselModelInitialState.wind.vesselType = 'Offshore supply vessel';
  }
  if (!initialVessel.wind || (initialVessel.wind && !initialVessel.wind.coefficientCalcType)) {
    vesselModelInitialState.wind.coefficientCalcType = 'blendermann';
  }
  if (!initialVessel.wind || (initialVessel.wind && !initialVessel.wind.sL)) {
    vesselModelInitialState.wind.sL = (1 / 4) * initialVessel.dimensions.lpp;
  }

  return vesselModelInitialState;
}

export {
  Gyrocompass,
  MRU,
  Windsensor,
  GPS,
  Thruster,
  UiThruster,
  VesselModel,
};
