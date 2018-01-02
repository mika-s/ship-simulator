import { LatLonSpherical } from 'geodesy';

class GeoUtil {
  /**
  * Get the new position in latitude and longitude, given old lat/lon-position
  * and new/previous position in meters.
  * @param {object} previousLatLonPos   - Object with previous latitude and longitude in degrees.
  * @param {object} newInMeterPos       - Object with new position in meters.
  * @param {object} previousInMeterPos  - Object with previous position in meters.
  * @returns {object}                   - Object with the new position in latitude
  *                                       and longitude in degrees.
  */
  static getPositionInLatLon(previousLatLonPos, newInMeterPos, previousInMeterPos) {
    const position = new LatLonSpherical(previousLatLonPos.latitude, previousLatLonPos.longitude);

    const lonΔ = (newInMeterPos.longitude - previousInMeterPos.longitude);
    const latΔ = (newInMeterPos.latitude - previousInMeterPos.latitude);

    const distance = Math.sqrt((lonΔ ** 2) + (latΔ ** 2));
    const bearing = Math.atan2(lonΔ, latΔ) * (180.0 / Math.PI);

    const newPosition = position.destinationPoint(distance, bearing);

    return {
      latitude: newPosition.lat,
      longitude: newPosition.lon,
    };
  }
}

export default GeoUtil;
