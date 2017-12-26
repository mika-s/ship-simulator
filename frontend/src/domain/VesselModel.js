import * as PubSub from 'pubsub-js';
import VesselUtil from './VesselUtil';

class VesselModel {
  constructor(longitude, latitude, heading, lpp, breadth, draft, blockCoefficient) {
    this._nedPosition = { latitude, longitude, heading };
    this._previousNedPosition = { latitude: 0.0, longitude: 0.0, heading: 0.0 };
    this._velocity = { u: 0.0, v: 0.0, r: 0.0 };
    this._previousVelocity = { u: 0.0, v: 0.0, r: 0.0 };
    this._dimensions = {
      lpp, breadth, draft, blockCoefficient,
    };

    this._T_thrusters = { surge: 0.0, sway: 0.0, yaw: 0.0 };
    this._T_wind = { surge: 0.0, sway: 0.0, yaw: 0.0 };
    this._T_current = { surge: 0.0, sway: 0.0, yaw: 0.0 };

    this._displacement = VesselUtil.calculateDisplacement(this._dimensions);
    this._mass = VesselUtil.calculateMass(this._displacement, this._dimensions.lpp);
    this._drag = VesselUtil.calculateDrag(this._displacement, this._dimensions.lpp);

    this.tick = this.tick.bind(this);
    this.calculatePosition = this.calculatePosition.bind(this);

    this.simulationTimeToken = PubSub.subscribe('simulationTime', this.tick);
  }

  tick() {
    this.calculatePosition();
    console.log(this._nedPosition);
  }

  calculatePosition() {
    // eta_d = R * nu
    // M * nu + D * nu_d = T_thr + T_wi + T_cu

    // Calculate total forces.
    const Tsu = this._T_thrusters.surge + this._T_wind.surge + this._T_current.surge;
    const Tsw = this._T_thrusters.sway + this._T_wind.sway + this._T_current.sway;
    const Tya = this._T_thrusters.yaw + this._T_wind.yaw + this._T_current.yaw;

    // Solve with respect to velocity.
    this._velocity = {
      u: (Tsu - (this._drag.surge * this._previousVelocity.u)) / this._mass.surge,
      v: (Tsw - (this._drag.sway * this._previousVelocity.v)) / this._mass.sway,
      r: (Tya - (this._drag.yaw * this._previousVelocity.r)) / this._mass.yaw,
    };

    // Transform to velocitites in NED.
    const nedVelocity = VesselUtil.transformBODYToNED({
      surge: this._velocity.u,
      sway: this._velocity.v,
      heading: this._nedPosition.heading,
    });

    // Integrate to get position.
    this._nedPosition = {
      latitude: this._previousNedPosition.latitude + nedVelocity.latitude,
      longitude: this._previousNedPosition.longitude + nedVelocity.longitude,
      heading: this._previousNedPosition.heading + this._velocity.r,
    };

    // Copy the solved velocities and position for use in the next iteration.
    Object.assign(this._previousVelocity, this._velocity);
    Object.assign(this._previousNedPosition, this._nedPosition);
  }
}

export default VesselModel;
