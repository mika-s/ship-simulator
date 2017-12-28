import * as PubSub from 'pubsub-js';

const stateEnum = { RUNNING: 1, PAUSED: 2, STOPPED: 3 };

class Simulator {
  constructor() {
    this._simulationTime = 0;
    this._state = stateEnum.STOPPED;

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
    if (this._state !== stateEnum.RUNNING) {
      this._state = stateEnum.RUNNING;
      this._timerID = setInterval(() => this.tick(), 1000);
    }
  }

  pause() {
    this._state = stateEnum.PAUSED;
    clearInterval(this._timerID);
  }

  stop() {
    if (this._state === stateEnum.PAUSED || this._state === stateEnum.RUNNING) {
      this._state = stateEnum.STOPPED;
      clearInterval(this._timerID);
      this.simulationTime = 0;
      PubSub.publish('reset', this.simulationTime);
    }
  }
}

export default Simulator;
