import VesselUtil from '../domain/VesselUtil';
import GeoUtil from '../domain/GeoUtil';

class NewVesselModel {
  static calculatePosition(mass, drag, forces, nedPosition, nedPositionInMeters, velocity) {
    const Tsu = forces.thrusters.surge + forces.wind.surge + forces.current.surge;
    const Tsw = forces.thrusters.sway + forces.wind.sway + forces.current.sway;
    const Tya = forces.thrusters.yaw + forces.wind.yaw + forces.current.yaw;

    const nuDot = {
      surge: (Tsu - (drag.surge * (Math.sign(velocity.u) * (velocity.u ** 2.0)))) / mass.surge,
      sway: (Tsw - (drag.sway * (Math.sign(velocity.v) * (velocity.v ** 2.0)))) / mass.sway,
      yaw: (Tya - (drag.yaw * (Math.sign(velocity.r) * (velocity.r ** 2.0)))) / mass.yaw,
    };

    const newVelocity = {
      u: velocity.u + nuDot.surge,
      v: velocity.v + nuDot.sway,
      r: velocity.r + nuDot.yaw,
    };

    const nedVelocity = VesselUtil.transformBODYToNED({
      surge: newVelocity.u,
      sway: newVelocity.v,
      heading: nedPosition.heading,
    });

    const newNedPositionInMeters = {
      latitude: nedPositionInMeters.latitude + nedVelocity.latitude,
      longitude: nedPositionInMeters.longitude + nedVelocity.longitude,
      heading: VesselUtil.transformTo0To2pi(nedPositionInMeters.heading + velocity.r),
    };

    const newPosition = GeoUtil.getPositionInLatLon(
      nedPosition,
      newNedPositionInMeters,
      nedPositionInMeters,
    );

    const newNedPosition = {
      latitude: newPosition.latitude,
      longitude: newPosition.longitude,
      heading: newNedPositionInMeters.heading,
    };

    return {
      position: newNedPosition,
      positionInMeters: newNedPositionInMeters,
      velocity: newVelocity,
    };
  }
}

export default NewVesselModel;