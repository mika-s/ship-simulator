function assertWindsensorConstructorInput(number, speed, direction) {
  const minNumber = 1;
  const maxNumber = 20;
  const minSpeed = 0.0;
  const maxSpeed = 50.0;
  const minDirection = 0.0;
  const maxDirection = 360.0;

  if (typeof number !== 'number' || number < minNumber || maxNumber < number) {
    throw new Error(`Illegal gyrocompass number: ${number}. Limits: ${minNumber} to ${maxNumber}.`);
  }

  if (typeof speed !== 'number' || speed < minSpeed || maxSpeed < speed) {
    throw new Error(`Illegal initial speed: ${speed} m/s. Limits: ${minSpeed} m/s to ${maxSpeed} m/s.`);
  }

  if (typeof direction !== 'number' || direction < minDirection || maxDirection < direction) {
    throw new Error(`Illegal initial direction: ${direction}°. Limits: ${minDirection}° to ${maxDirection}°.`);
  }
}

function Windsensor(data) {
  const { number, initialSpeed, initialDirection } = data;
  assertWindsensorConstructorInput(number, initialSpeed, initialDirection);

  this.number = number;
  this.speed = initialSpeed;
  this.direction = initialDirection;
}

export default Windsensor;
