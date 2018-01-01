class SensorUtil {
  static assertGyrocompassConstructorInput(number, heading) {
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

  static assertMruConstructorInput(number, roll, pitch) {
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

  static assertWindsensorConstructorInput(number, speed, direction) {
    const minNumber = 1;
    const maxNumber = 20;
    const minSpeed = 0.0;
    const maxSpeed = 360.0;
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
}

export default SensorUtil;
