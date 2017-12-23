class GeneralUtil {
  static getRandomBetween(min, max) {
    return (Math.random() * (max - min)) + min;
  }
}

export default GeneralUtil;
