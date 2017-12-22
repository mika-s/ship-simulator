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
import Ship from './domain/Ship';
import './App.css';

const ship = new Ship();

const App = () =>
  (
    <div className="container">
      <Menu />

      <main>
        <SimulatorControl
          simulationTime={ship.simulationTime}
          onStart={ship.start}
          onPause={ship.pause}
          onStop={ship.stop}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/map" component={Map} />
          <Route path="/power" component={Power} />
          <Route path="/sensors" component={Sensors} />
          <Route path="/settings" component={Settings} />
          <Route path="/thrusters" component={Thrusters} />
        </Switch>
      </main>
    </div>
  );


export default App;
