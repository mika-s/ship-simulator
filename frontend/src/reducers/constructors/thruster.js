import { vesselControlMode } from '../../util/enums';

/**
* Calculate maximum force, both directions, using IMCA's rules.
* @param {string} type              - Thruster type: tunnel, azimuth, propeller or waterjet.
* @param {Object} maxPowerPositive  - Maximum power, positive and negative direction.
* @returns {Object} Object containing max force in pos. and neg. direction.
* @returns {number} Maximum force in positive direction.
* @returns {number} Maximum force in negative direction.
*/
function calculateMaxForce(type, maxPower) {
  const grav = 9.81;
  const hpPerKw = 1.36332;

  let conversionFactorPositive;
  let conversionFactorNegative;

  if (type === 'tunnel') {
    conversionFactorPositive = 11.0 * (10 ** -3) * hpPerKw * grav;
    conversionFactorNegative = -11.0 * (10 ** -3) * hpPerKw * grav;
  } else if (type === 'azimuth') {
    conversionFactorPositive = 13.0 * (10 ** -3) * hpPerKw * grav;
    conversionFactorNegative = -8.0 * (10 ** -3) * hpPerKw * grav;
  } else if (type === 'propeller') {
    conversionFactorPositive = 13.0 * (10 ** -3) * hpPerKw * grav;
    conversionFactorNegative = -0.7 * conversionFactorPositive;
  } else if (type === 'waterjet') {
    conversionFactorPositive = 8.0 * (10 ** -3) * hpPerKw * grav;
    conversionFactorNegative = 0.0;
  } else {
    throw new Error('Illegal thruster type.');
  }

  const maxForcePositive = conversionFactorPositive * (maxPower.positive / grav);
  const maxForceNegative = conversionFactorNegative * (maxPower.negative / grav);

  return { positive: maxForcePositive, negative: maxForceNegative };
}

/**
* Convert risetimes from %/s and °/s to factor/s.
* @param {Object} risetimes   - The risetimes object.
* @returns {Object} The risetimes object with converted values.
*/
function normalizeRisetimes(risetimes) {
  const convertedRisetimes = JSON.parse(JSON.stringify(risetimes));

  if (convertedRisetimes.rpm) {
    convertedRisetimes.rpm.positive /= 100.0;
    convertedRisetimes.rpm.negative /= 100.0;
  }

  if (convertedRisetimes.pitch) {
    convertedRisetimes.pitch.positive /= 100.0;
    convertedRisetimes.pitch.negative /= 100.0;
  }

  return convertedRisetimes;
}

/**
* Assert that the constructor input for Thruster is correct.
* Throws error if assertion fails.
* @param {number} number              Thruster number.
* @param {string} name                Name.
* @param {string} thrusterType        Thruster type.
* @param {string} controlType         Control type.
* @param {Object} maxPower            Max power, positive and negative, in kW.
* @param {Object} location            Location, x and y, in meters.
* @param {Object} risetimes           Rise times, positive and negative, in %/s and deg/s.
* @param {Object} misc                Misc. parameters.
* @param {Object} pitchExponent       Pitch exponent, positive and negative.
* @param {Object} pitchPowerExponent  Pitch power exponent, positive and negative.
*/
function assertThrusterConstructorInput(
  number, name, thrusterType, controlType,
  maxPower, location, risetimes, misc,
  pitchExponent, pitchPowerExponent,
) {
  const minThrusterNameLength = 1;
  const maxThrusterNameLength = 20;
  const minNumber = 1;
  const maxNumber = 20;
  const maxPowerLowLimit = 0.0;
  const maxPowerHighLimit = 20000.0;
  const minXPos = -200.0;
  const maxXPos = 200.0;
  const minYPos = -50.0;
  const maxYPos = 50.0;
  const minMaxRudderAngle = 0.0;
  const maxMaxRudderAngle = 90.0;
  const minPitchExponent = 0.0;
  const maxPitchExponent = 2.5;
  const minPitchPowerExponent = 0.0;
  const maxPitchPowerExponent = 5.0;

  const minRisetime = {
    rpm: {
      positive: 1.00,
      negative: -1.00,
    },
    pitch: {
      positive: 1.00,
      negative: -1.00,
    },
    azimuth: {
      positive: 1.0,
      negative: -1.0,
    },
  };

  const maxRisetime = {
    rpm: {
      positive: 30.00,
      negative: -30.00,
    },
    pitch: {
      positive: 30.00,
      negative: -30.00,
    },
    azimuth: {
      positive: 30.0,
      negative: -30.0,
    },
  };

  if (typeof number !== 'number' || number < minNumber || maxNumber < number) {
    throw new Error(`Illegal thruster number: ${number}. Limits: lowest: ${minNumber}, highest: ${maxNumber}.`);
  }

  if (typeof name !== 'string' || name.length < minThrusterNameLength || maxThrusterNameLength < name.length) {
    throw new Error(`Illegal thruster name: ${name}. Limits: length: ${minThrusterNameLength}-${maxThrusterNameLength}.`);
  }

  if (thrusterType !== 'tunnel' && thrusterType !== 'azimuth' && thrusterType !== 'propeller' && thrusterType !== 'waterjet') {
    throw new Error('Illegal thruster type.');
  }

  if (thrusterType !== 'tunnel' && thrusterType !== 'azimuth' && thrusterType !== 'propeller' && thrusterType !== 'waterjet') {
    throw new Error('Illegal thruster type.');
  }

  if (controlType !== 'rpm' && controlType !== 'pitch') {
    throw new Error('Illegal control type.');
  }

  if (typeof maxPower.positive !== 'number' || maxPower.positive < maxPowerLowLimit || maxPowerHighLimit < maxPower.positive) {
    throw new Error(`Max power positive is too low or too high. Limits: ${maxPowerLowLimit} kW to ${maxPowerHighLimit} kW.`);
  }

  if (typeof maxPower.negative !== 'number' || maxPower.negative < maxPowerLowLimit || maxPowerHighLimit < maxPower.negative) {
    throw new Error(`Max power negative is too low or too high. Limits: ${maxPowerLowLimit} kW to ${maxPowerHighLimit} kW.`);
  }

  if (typeof location.x !== 'number' || location.x < minXPos || maxXPos < location.x) {
    throw new Error(`x position is too small or too large. Limits: ${minXPos} m to ${maxXPos} m.`);
  }

  if (typeof location.y !== 'number' || location.y < minYPos || maxYPos < location.y) {
    throw new Error(`y position is too small or too large. Limits: ${minYPos} m to ${maxYPos} m.`);
  }

  if (typeof misc.maxRudderAngle !== 'number' || misc.maxRudderAngle < minMaxRudderAngle || maxMaxRudderAngle < misc.maxRudderAngle) {
    throw new Error(`maxRudderAngle is too small or too large. Limits: ${minMaxRudderAngle}° to ${maxMaxRudderAngle}°.`);
  }

  if (risetimes.rpm && (typeof risetimes.rpm.positive !== 'number'
    || risetimes.rpm.positive < minRisetime.rpm.positive
    || maxRisetime.rpm.positive < risetimes.rpm.positive)) {
    throw new Error(`RPM risetime positive is too small or too large. Limits: ${minRisetime.rpm.positive} %/s to ${maxRisetime.rpm.positive} %/s.`);
  }

  if (risetimes.rpm && (typeof risetimes.rpm.negative !== 'number'
    || risetimes.rpm.negative > minRisetime.rpm.negative
    || maxRisetime.rpm.negative > risetimes.rpm.negative)) {
    throw new Error(`RPM risetime negative is too small or too large. Limits: ${minRisetime.rpm.negative} %/s to ${maxRisetime.rpm.negative} %/s.`);
  }

  if (risetimes.pitch && (typeof risetimes.pitch.positive !== 'number'
    || risetimes.pitch.positive < minRisetime.pitch.positive
    || maxRisetime.pitch.positive < risetimes.pitch.positive)) {
    throw new Error(`Pitch risetime positive is too small or too large. Limits: ${minRisetime.pitch.positive} %/s to ${maxRisetime.pitch.positive} %/s.`);
  }

  if (risetimes.pitch && (typeof risetimes.pitch.negative !== 'number'
    || risetimes.pitch.negative > minRisetime.pitch.negative
    || maxRisetime.pitch.negative > risetimes.pitch.negative)) {
    throw new Error(`Pitch risetime negative is too small or too large. Limits: ${minRisetime.pitch.negative} %/s to ${maxRisetime.pitch.negative} %/s.`);
  }

  if (risetimes.azimuth && (typeof risetimes.azimuth.positive !== 'number'
    || risetimes.azimuth.positive < minRisetime.azimuth.positive
    || maxRisetime.azimuth.positive < risetimes.azimuth.positive)) {
    throw new Error(`Azimuth risetime positive is too small or too large. Limits: ${minRisetime.azimuth.positive} °/s to ${maxRisetime.azimuth.positive} °/s.`);
  }

  if (risetimes.azimuth && (typeof risetimes.azimuth.negative !== 'number'
    || risetimes.azimuth.negative > minRisetime.azimuth.negative
    || maxRisetime.azimuth.negative > risetimes.azimuth.negative)) {
    throw new Error(`Azimuth risetime negative is too small or too large. Limits: ${minRisetime.azimuth.negative} °/s to ${maxRisetime.azimuth.negative} °/s.`);
  }

  if (typeof pitchExponent.positive !== 'number' || pitchExponent.positive < minPitchExponent || maxPitchExponent < pitchExponent.positive) {
    throw new Error(`pitch exponent positive is too small or too large. Limits: ${minPitchExponent} to ${maxPitchExponent}.`);
  }

  if (typeof pitchExponent.negative !== 'number' || pitchExponent.negative < minPitchExponent || maxPitchExponent < pitchExponent.negative) {
    throw new Error(`pitch exponent negative is too small or too large. Limits: ${minPitchExponent} to ${maxPitchExponent}.`);
  }

  if (typeof pitchPowerExponent.positive !== 'number' ||
    pitchPowerExponent.positive < minPitchPowerExponent ||
    maxPitchPowerExponent < pitchPowerExponent.positive) {
    throw new Error(`pitch power exponent positive is too small or too large. Limits: ${minPitchPowerExponent} to ${maxPitchPowerExponent}.`);
  }

  if (typeof pitchPowerExponent.negative !== 'number' ||
    pitchPowerExponent.negative < minPitchPowerExponent ||
    maxPitchPowerExponent < pitchPowerExponent.negative) {
    throw new Error(`pitch power exponent negative is too small or too large. Limits: ${minPitchPowerExponent} to ${maxPitchPowerExponent}.`);
  }
}

/**
* Constructor function for a thruster.
* @param {Object} data    Object with initial data.
*/
function Thruster(data) {
  const {
    number, name, thrusterType, controlType,
    maxPower, location, risetimes, misc = { maxRudderAngle: 45.0 },
    pitchExponent = { positive: 0.0, negative: 0.0 },
    pitchPowerExponent = { positive: 0.0, negative: 0.0 },
  } = data;
  assertThrusterConstructorInput(
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
  this.risetimes = normalizeRisetimes(risetimes, thrusterType);
  this.pitchExponent = pitchExponent;
  this.pitchPowerExponent = pitchPowerExponent;
  this.rpmExponent = controlType === 'rpm' ? { positive: 2.0, negative: 2.0 } : { positive: 0.0, negative: 0.0 };
  this.rpmPowerExponent = controlType === 'rpm' ? { positive: 3.0, negative: 3.0 } : { positive: 0.0, negative: 0.0 };
  this.mode = vesselControlMode.AUTOPILOT;

  this.maxForce = calculateMaxForce(thrusterType, maxPower);

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

export default Thruster;
