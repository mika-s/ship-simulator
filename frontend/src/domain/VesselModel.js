import * as PubSub from 'pubsub-js';
import GeoUtil from './GeoUtil';
import VesselUtil from './VesselUtil';

class VesselModel {
  constructor(latitude, longitude, heading, lpp, breadth, draft, blockCoefficient) {
    this._initialValues = { latitude, longitude, heading };

    this.reset();

    this._dimensions = {
      lpp, breadth, draft, blockCoefficient,
    };

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
    this.reset = this.reset.bind(this);
    this.calculatePosition = this.calculatePosition.bind(this);

    this.simulationTimeToken = PubSub.subscribe('simulationTime', this.tick);
    this.resetToken = PubSub.subscribe('reset', this.reset);
  }

  destruct() {
    PubSub.unsubscribe(this.simulationTimeToken);
  }

  tick() {
    // this.calculatePosition();
  }

  reset() {
    this._nedPosition = this._initialValues;
    this._previousNedPosition = Object.assign({}, this._nedPosition);

    this._nedPositionInMeters = { latitude: 0.0, longitude: 0.0, heading: 0.0 };
    this._previousNedPositionInMeters = Object.assign({}, this._nedPositionInMeters);

    this._velocity = { u: 0.0, v: 0.0, r: 0.0 };

    this._T_thrusters = { surge: 0.0, sway: 0.0, yaw: 0.0 };
    this._T_wind = { surge: 0.0, sway: 0.0, yaw: 0.0 };
    this._T_current = { surge: 0.0, sway: 0.0, yaw: 0.0 };
  }

  calculatePosition(TsuInp, TswInp, TyaInp) {
    // eta_d = R * nu
    // M * nu_d + D * nu = T_thr + T_wi + T_cu

    this._T_thrusters.surge = TsuInp;
    this._T_thrusters.sway = TswInp;
    this._T_thrusters.yaw = TyaInp;

    const Tsu = this._T_thrusters.surge + this._T_wind.surge + this._T_current.surge;
    const Tsw = this._T_thrusters.sway + this._T_wind.sway + this._T_current.sway;
    const Tya = this._T_thrusters.yaw + this._T_wind.yaw + this._T_current.yaw;

    const nuDot = {
      surge: (Tsu - (this._drag.surge * (Math.sign(this._velocity.u) *
        (this._velocity.u ** 2.0)))) / this._mass.surge,

      sway: (Tsw - (this._drag.sway * (Math.sign(this._velocity.v) *
        (this._velocity.v ** 2.0)))) / this._mass.sway,

      yaw: (Tya - (this._drag.yaw * (Math.sign(this._velocity.r) *
        (this._velocity.r ** 2.0)))) / this._mass.yaw,
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

    this._nedPositionInMeters = {
      latitude: this._previousNedPositionInMeters.latitude + nedVelocity.latitude,
      longitude: this._previousNedPositionInMeters.longitude + nedVelocity.longitude,
      heading: VesselUtil.transformTo0To2pi(this._previousNedPositionInMeters.heading
        + this._velocity.r),
    };

    const newPosition = GeoUtil.getPositionInLatLon(
      this._nedPosition,
      this._nedPositionInMeters,
      this._previousNedPositionInMeters,
    );

    this._nedPosition = {
      latitude: newPosition.latitude,
      longitude: newPosition.longitude,
      heading: this._nedPositionInMeters.heading,
    };

    this._previousNedPositionInMeters = Object.assign({}, this._nedPositionInMeters);
    this._previousNedPosition = Object.assign({}, this._nedPosition);

    PubSub.publish('heading', this._nedPosition.heading * (180.0 / Math.PI));
    PubSub.publish('position', { latitude: this._nedPosition.latitude, longitude: this._nedPosition.longitude });
    PubSub.publish('velocity', this._velocity);
  }
}

export default VesselModel;
