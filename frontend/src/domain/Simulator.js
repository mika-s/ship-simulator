import * as PubSub from 'pubsub-js';
import * as simulation from '../actions/simulation.actions';
import { simulationState } from '../enums';
import store from '../redux.store';

class Simulator {
  constructor() {
    this._simulationTime = 0;
    this._state = simulationState.STOPPED;

    this.tick = this.tick.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
  }

  tick() {
    this.simulationTime += 1;
    store.dispatch(simulation.incrementSimulationTime());
  }

  get simulationTime() { return this._simulationTime; }

  set simulationTime(value) {
    this._simulationTime = value;
    PubSub.publish('simulationTime', this.simulationTime);
  }

  start() {
    const { state } = store.getState().simulation;
    if (state !== simulationState.RUNNING) {
      store.dispatch(simulation.setSimulationState(simulationState.RUNNING));
    }

    if (this._state !== simulationState.RUNNING) {
      this._state = simulationState.RUNNING;
      this._timerID = setInterval(() => this.tick(), 1000);
    }
  }

  pause() {
    store.dispatch(simulation.setSimulationState(simulationState.PAUSED));
    this._state = simulationState.PAUSED;
    clearInterval(this._timerID);
  }

  stop() {
    const { state } = store.getState().simulation;
    if (state === simulationState.PAUSED || state === simulationState.RUNNING) {
      store.dispatch(simulation.setSimulationState(simulationState.STOPPED));
      store.dispatch(simulation.stopSimulationTime());
    }

    if (this._state === simulationState.PAUSED || this._state === simulationState.RUNNING) {
      this._state = simulationState.STOPPED;
      clearInterval(this._timerID);
      this.simulationTime = 0;
      PubSub.publish('reset', this.simulationTime);
    }
  }
}

export default Simulator;
