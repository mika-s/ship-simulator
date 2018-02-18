/**
* Add a new value to an array when the length of it is less than 60. When the
* length is more or equal to 60, add one value as well as remove one value from
* the beginning of the same array.
* @param {*[]}       oldArray    The array to update.
* @param {*}         newValue    The new value to insert into the old array.
* @returns {*[]} The array updated.
*/
export function updateArray(oldArray, newValue) {
  const secondToSave = 60;

  const newArray = oldArray.slice();

  if (newArray.length < secondToSave) {
    newArray.push(newValue);
  } else {
    newArray.shift();
    newArray.push(newValue);
  }

  return newArray;
}
