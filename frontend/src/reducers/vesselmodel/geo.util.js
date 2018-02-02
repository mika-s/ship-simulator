import { LatLonEllipsoidal } from 'geodesy';

const { sqrt, atan2, PI } = Math;

/**
* Get the new position in latitude and longitude, given old lat/lon-position
* and new/previous position in meters.
* @param {Object} previousLatLonPos   - Object with previous latitude and longitude in degrees.
* @param {Object} newInMeterPos       - Object with new position in meters.
* @param {Object} previousInMeterPos  - Object with previous position in meters.
* @returns {Object}                   - Object with the new position in latitude
*                                       and longitude in degrees.
*/
export function getPositionInLatLon(previousLatLonPos, newInMeterPos, previousInMeterPos) {
  const position = new LatLonEllipsoidal(previousLatLonPos.latitude, previousLatLonPos.longitude);

  const lonΔ = (newInMeterPos.longitude - previousInMeterPos.longitude);
  const latΔ = (newInMeterPos.latitude - previousInMeterPos.latitude);

  const distance = sqrt((lonΔ ** 2) + (latΔ ** 2));
  const bearing = atan2(lonΔ, latΔ) * (180.0 / PI);

  const newPosition = position.destinationPoint(distance, bearing);

  return {
    latitude: newPosition.lat,
    longitude: newPosition.lon,
  };
}
