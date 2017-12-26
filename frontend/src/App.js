import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Map from './components/map/Map';
import Power from './components/power/Power';
import Sensors from './components/sensors/Sensors';
import Thrusters from './components/thrusters/Thrusters';
import Settings from './components/settings/Settings';
import SimulatorControl from './components/simulator-control/Simulator-control';
import Menu from './components/menu/Menu';
import Simulator from './domain/Simulator';
import VesselModel from './domain/VesselModel';
import Ship from './domain/Ship';
import './App.css';

const simulator = new Simulator();
const vesselModel = new VesselModel(0.0, 0.0, 0.0, 100.0, 16.0, 5.0, 0.71);
const ship = new Ship();

const App = () =>
  (
    <div className="container">
      <Menu />

      <main>
        <SimulatorControl
          onStart={simulator.start}
          onPause={simulator.pause}
          onStop={simulator.stop}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/map" component={Map} />
          <Route path="/power" component={Power} />
          <Route
            path="/sensors"
            render={() => (
              <Sensors
                windSensors={ship.windSensors}
                gyroCompasses={ship.gyrocompasses}
                mruSensors={ship.mruSensors}
              />)}
          />
          <Route path="/settings" component={Settings} />
          <Route path="/thrusters" render={() => <Thrusters thrusters={ship.thrusters} />} />
        </Switch>
      </main>
    </div>
  );

export default App;
