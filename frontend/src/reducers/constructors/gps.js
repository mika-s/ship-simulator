function assertGpsConstructorInput(number, position) {
  const minNumber = 1;
  const maxNumber = 20;
  const minLatitude = -90.0;
  const maxLatitude = 90.0;
  const minLongitude = -180.0;
  const maxLongitude = 180.0;

  if (typeof number !== 'number' || number < minNumber || maxNumber < number) {
    throw new Error(`Illegal GPS number: ${number}. Limits: ${minNumber} to ${maxNumber}.`);
  }

  if (typeof position.latitude !== 'number' || position.latitude < minLatitude || maxLatitude < position.latitude) {
    throw new Error(`Illegal initial latitude: ${position.latitude}°. Limits: ${minLatitude}° to ${maxLatitude}°.`);
  }

  if (typeof position.longitude !== 'number' || position.longitude < minLongitude || maxLongitude < position.longitude) {
    throw new Error(`Illegal initial longitude: ${position.longitude}°. Limits: ${minLongitude}° to ${maxLongitude}°.`);
  }
}

function GPS(data) {
  const { number, initialPosition } = data;
  assertGpsConstructorInput(number, initialPosition);

  this.number = number;
  this.position = {
    latitude: initialPosition.latitude,
    longitude: initialPosition.longitude,
  };
}

export default GPS;
