import GeneralUtil from '../domain/GeneralUtil';

class MRU {
  static calculateRollAndPitch(mru, modelRoll, modelPitch) {
    const newMRU = Object.assign({}, mru);

    newMRU.roll = MRU.measureRoll(modelRoll);
    newMRU.pitch = MRU.measurePitch(modelPitch);

    return newMRU;
  }

  static measureRoll(roll) {
    const minRoll = -20.0;
    const maxRoll = 20.0;
    const minNoiseAmplitude = -0.05;
    const maxNoiseAmplitude = 0.05;

    // Add measurement noise.
    let newRoll = roll + GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

    // Apply clip limits.
    newRoll = Math.min(newRoll, maxRoll);
    newRoll = Math.max(newRoll, minRoll);

    // Remove unnecessary decimals. Keep 2.
    newRoll = GeneralUtil.truncToDecimal(newRoll, 2);

    return newRoll;
  }

  static measurePitch(pitch) {
    const minPitch = -15.0;
    const maxPitch = 15.0;
    const minNoiseAmplitude = -0.05;
    const maxNoiseAmplitude = 0.05;

    let newPitch = pitch + GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

    // Apply clip limits.
    newPitch = Math.min(newPitch, maxPitch);
    newPitch = Math.max(newPitch, minPitch);

    // Remove unnecessary decimals. Keep 2.
    newPitch = GeneralUtil.truncToDecimal(newPitch, 2);

    return newPitch;
  }
}

export default MRU;
