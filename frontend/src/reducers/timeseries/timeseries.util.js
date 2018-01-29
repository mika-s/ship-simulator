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
