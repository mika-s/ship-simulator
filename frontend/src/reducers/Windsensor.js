import GeneralUtil from '../domain/GeneralUtil';

class Windsensor {
  static calculateSpeedAndDirection(
    windsensor, modelSpeed, modelDirection,
    vesselSpeed, vesselHeading,
  ) {
    const newWindsensor = Object.assign({}, windsensor);

    const relative = Windsensor.getRelativeSpeedAndDirection(
      modelSpeed,
      modelDirection,
      vesselSpeed,
      vesselHeading,
    );

    newWindsensor.speed = Windsensor.measureSpeed(relative.speed);
    newWindsensor.direction = Windsensor.measureDirection(relative.direction);

    return newWindsensor;
  }

  static getRelativeSpeedAndDirection(modelSpeed, modelDirection, vesselSpeed, vesselHeading) {
    let x = modelSpeed * Math.cos((
      modelDirection - vesselHeading) * (Math.PI / 180.0));

    let y = modelSpeed * Math.sin((
      modelDirection - vesselHeading) * (Math.PI / 180.0));

    x -= vesselSpeed.u;
    y -= vesselSpeed.v;

    return {
      speed: Math.sqrt((x ** 2) + (y ** 2)),
      direction: Math.atan2(y, x) * (180.0 / Math.PI),
    };
  }

  static measureSpeed(speed) {
    const minSpeed = 0.0;
    const maxSpeed = 50.0;
    const minNoiseAmplitude = -0.5;
    const maxNoiseAmplitude = 0.5;

    // Add measurement noise.
    let newSpeed = speed +
      GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

    // Apply clip limits.
    newSpeed = Math.min(newSpeed, maxSpeed);
    newSpeed = Math.max(newSpeed, minSpeed);

    // Remove unnecessary decimals. Keep 2.
    newSpeed = GeneralUtil.truncToDecimal(newSpeed, 2);

    return newSpeed;
  }

  static measureDirection(direction) {
    const minDirection = 0.0;
    const maxDirection = 360.0;
    const minNoiseAmplitude = -0.5;
    const maxNoiseAmplitude = 0.5;

    // Add measurement noise.
    let newDirection = direction +
      GeneralUtil.getRandomBetween(minNoiseAmplitude, maxNoiseAmplitude);

    // Apply clip limits.
    newDirection = Math.min(newDirection, maxDirection);
    newDirection = Math.max(newDirection, minDirection);

    // Remove unnecessary decimals. Keep 2.
    newDirection = GeneralUtil.truncToDecimal(newDirection, 2);

    return newDirection;
  }
}

export default Windsensor;
