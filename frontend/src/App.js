import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Map from './components/map/Map';
import Power from './components/power/Power';
import Sensors from './components/sensors/Sensors';
import Thrusters from './components/thrusters/Thrusters';
import Settings from './components/settings/Settings';
import Ship from './components/ship/Ship';
import Menu from './components/menu/Menu';
import './App.css';

const App = () =>
  (
    <div className="container">
      <Menu />
      <Ship />

      <main>
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
