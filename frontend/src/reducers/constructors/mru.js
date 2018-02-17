/**
* Assert that the constructor input for MRU is correct.
* Throws error if assertion fails.
* @param {number} number     MRU number.
* @param {number} roll       Initial roll in degrees.
* @param {number} pitch      Initial pitch in degrees.
*/
function assertMruConstructorInput(number, roll, pitch) {
  const minNumber = 1;
  const maxNumber = 20;
  const minRoll = -20.0;
  const maxRoll = 20.0;
  const minPitch = -15.0;
  const maxPitch = 15.0;

  if (typeof number !== 'number' || number < minNumber || maxNumber < number) {
    throw new Error(`Illegal GPS number: ${number}. Limits: ${minNumber} to ${maxNumber}.`);
  }

  if (typeof roll !== 'number' || roll < minRoll || maxRoll < roll) {
    throw new Error(`Illegal initial roll: ${roll}°. Limits: ${minRoll}° to ${maxRoll}°.`);
  }

  if (typeof pitch !== 'number' || pitch < minPitch || maxPitch < pitch) {
    throw new Error(`Illegal initial pitch: ${pitch}°. Limits: ${minPitch}° to ${maxPitch}°.`);
  }
}

/**
* Constructor function for an MRU.
* @param {Object} data    Object with initial data.
*/
function MRU(data) {
  const { number, initialRoll, initialPitch } = data;
  assertMruConstructorInput(number, initialRoll, initialPitch);

  this.number = number;
  this.roll = initialRoll;
  this.pitch = initialPitch;
}

export default MRU;
