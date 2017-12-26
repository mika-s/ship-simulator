import { LatLonSpherical } from 'geodesy';

class GeoUtil {
  static getPositionInLatLon(previousLatLonPos, newInMeterPos, previousInMeterPos) {
    const position = new LatLonSpherical(previousLatLonPos.latitude, previousLatLonPos.longitude);

    const lonDelta = (newInMeterPos.longitude - previousInMeterPos.longitude);
    const latDelta = (newInMeterPos.latitude - previousInMeterPos.latitude);

    const distance = Math.sqrt((lonDelta ** 2) + (latDelta ** 2));
    const bearing = Math.atan2(lonDelta, latDelta) * (180.0 / Math.PI);

    const newPosition = position.destinationPoint(distance, bearing);

    return {
      latitude: newPosition.lat,
      longitude: newPosition.lon,
    };
  }
}

export default GeoUtil;
