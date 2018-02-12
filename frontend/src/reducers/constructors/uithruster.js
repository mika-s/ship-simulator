/**
* Assert that the constructor input for UiThruster is correct.
* Throws error if assertion fails.
* @param {number} number   - Thruster number.
* @returns {undefined}     - Doesn't return anything.
*/
function assertUiThrusterConstructorInput(number) {
  const minNumber = 1;
  const maxNumber = 20;

  if (typeof number !== 'number' || number < minNumber || maxNumber < number) {
    throw new Error(`Illegal thruster number: ${number}. Limits: lowest: ${minNumber}, highest: ${maxNumber}.`);
  }
}

/**
* Constructor function for a UI thruster.
* @param {Object} data    Object with initial data.
*/
function UiThruster(data) {
  const { number } = data;
  assertUiThrusterConstructorInput(number);

  this.number = number;
  this.demand = { rpm: 0.0, pitch: 0.0, azimuth: 0.0 };
}

export default UiThruster;
