function assertGyrocompassConstructorInput(number, heading) {
  const minNumber = 1;
  const maxNumber = 20;
  const minHeading = 0.0;
  const maxHeading = 360.0;

  if (typeof number !== 'number' || number < minNumber || maxNumber < number) {
    throw new Error(`Illegal gyrocompass number: ${number}. Limits: ${minNumber} to ${maxNumber}.`);
  }

  if (typeof heading !== 'number' || heading < minHeading || maxHeading < heading) {
    throw new Error(`Illegal initial heading: ${heading}°. Limits: ${minHeading}° to ${maxHeading}°.`);
  }
}


function Gyrocompass(data) {
  const { number, initialHeading } = data;
  assertGyrocompassConstructorInput(number, initialHeading);

  this.number = number;
  this.heading = initialHeading;
}

export default Gyrocompass;