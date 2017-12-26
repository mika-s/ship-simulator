import * as PubSub from 'pubsub-js';
import VesselUtil from './VesselUtil';

class VesselModel {
  constructor(latitude, longitude, heading, lpp, breadth, draft, blockCoefficient) {
    this._nedPosition = { latitude, longitude, heading };
    this._previousNedPosition = { latitude: 0.0, longitude: 0.0, heading: 0.0 };
    this._velocity = { u: 0.0, v: 0.0, r: 0.0 };
    this._dimensions = {
      lpp, breadth, draft, blockCoefficient,
    };

    this._T_thrusters = { surge: 0.0, sway: 0.0, yaw: 0.0 };
    this._T_wind = { surge: 0.0, sway: 0.0, yaw: 0.0 };
    this._T_current = { surge: 0.0, sway: 0.0, yaw: 0.0 };

    this._displacement = VesselUtil.calculateDisplacement(this._dimensions);

    this._mass = VesselUtil.calculateMass(
      this._displacement,
      this._dimensions.lpp,
    );

    this._drag = VesselUtil.calculateDrag(
      this._dimensions.lpp,
      this._dimensions.breadth,
      this._dimensions.draft,
    );

    this.destruct = this.destruct.bind(this);
    this.tick = this.tick.bind(this);
    this.calculatePosition = this.calculatePosition.bind(this);

    this.simulationTimeToken = PubSub.subscribe('simulationTime', this.tick);
  }

  destruct() {
    PubSub.unsubscribe(this.simulationTimeToken);
  }

  tick() {
    this.calculatePosition();
  }

  calculatePosition() {
    // eta_d = R * nu
    // M * nu_d + D * nu = T_thr + T_wi + T_cu

    this._T_thrusters.surge = 100.0;

    const Tsu = this._T_thrusters.surge + this._T_wind.surge + this._T_current.surge;
    const Tsw = this._T_thrusters.sway + this._T_wind.sway + this._T_current.sway;
    const Tya = this._T_thrusters.yaw + this._T_wind.yaw + this._T_current.yaw;

    const nuDot = {
      surge: (Tsu - (this._drag.surge * (this._velocity.u ** 2.0))) / this._mass.surge,
      sway: (Tsw - (this._drag.sway * (this._velocity.v ** 2.0))) / this._mass.sway,
      yaw: (Tya - (this._drag.yaw * (this._velocity.r ** 2.0))) / this._mass.yaw,
    };

    this._velocity = {
      u: this._velocity.u + nuDot.surge,
      v: this._velocity.v + nuDot.sway,
      r: this._velocity.r + nuDot.yaw,
    };

    const nedVelocity = VesselUtil.transformBODYToNED({
      surge: this._velocity.u,
      sway: this._velocity.v,
      heading: this._nedPosition.heading,
    });

    const nedPositionInMeters = {
      latitude: this._previousNedPosition.latitude + nedVelocity.latitude,
      longitude: this._previousNedPosition.longitude + nedVelocity.longitude,
      heading: this._previousNedPosition.heading + this._velocity.r,
    };

    this._nedPosition = {
      latitude: nedPositionInMeters.latitude,
      longitude: nedPositionInMeters.longitude,
      heading: nedPositionInMeters.heading,
    };

    Object.assign(this._previousNedPosition, nedPositionInMeters);

    PubSub.publish('heading', this._nedPosition.heading);
    PubSub.publish('position', { latitude: this._nedPosition.latitude, longitude: this._nedPosition.longitude });
  }
}

export default VesselModel;
