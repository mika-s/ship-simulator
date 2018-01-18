import { transformBODYToNED, transformTo0To2pi } from '../../util/kinematics.util';
import { getPositionInLatLon } from './geo.util';

export function calculatePosition(mass, drag, forces, position) {
  const { position: nedPosition, positionInMeters: nedPositionInMeters, velocity } = position;

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

  const nedVelocity = transformBODYToNED({
    surge: newVelocity.u,
    sway: newVelocity.v,
    heading: nedPosition.heading,
  });

  const newNedPositionInMeters = {
    latitude: nedPositionInMeters.latitude + nedVelocity.latitude,
    longitude: nedPositionInMeters.longitude + nedVelocity.longitude,
    heading: transformTo0To2pi(nedPositionInMeters.heading + velocity.r),
  };

  const newPosition = getPositionInLatLon(
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

export function calculateForces(thrusters, windForces, currentForces) {
  const forces = {
    thrusters: { surge: 0.0, sway: 0.0, yaw: 0.0 },
    wind: windForces,
    current: currentForces,
  };

  for (let thrIdx = 0; thrIdx < thrusters.length; thrIdx += 1) {
    const thr = thrusters[thrIdx];

    forces.thrusters.surge +=
      thr.force * Math.cos(thr.feedback.azimuth * (Math.PI / 180.0));

    forces.thrusters.sway +=
      thr.force * Math.sin(thr.feedback.azimuth * (Math.PI / 180.0));

    forces.thrusters.yaw +=
      (thr.force * thr.location.x * Math.sin(thr.feedback.azimuth * (Math.PI / 180.0))) -
      (thr.force * thr.location.y * Math.cos(thr.feedback.azimuth * (Math.PI / 180.0)));
  }

  return forces;
}
