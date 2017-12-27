import * as PubSub from 'pubsub-js';

class Simulator {
  constructor() {
    this._simulationTime = 0;

    this.tick = this.tick.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
  }

  tick() {
    this.simulationTime += 1;
  }

  get simulationTime() { return this._simulationTime; }

  set simulationTime(value) {
    this._simulationTime = value;
    PubSub.publish('simulationTime', this.simulationTime);
  }

  start() {
    this._timerID = setInterval(
      () => this.tick(),
      1000,
    );
  }

  pause() {
    clearInterval(this._timerID);
  }

  stop() {
    clearInterval(this._timerID);
    this.simulationTime = 0;
    PubSub.publish('reset', this.simulationTime);
  }
}

export default Simulator;
