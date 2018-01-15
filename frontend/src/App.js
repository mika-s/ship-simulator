import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Control from './components/control/Control';
import Map from './components/map/Map';
import Power from './components/power/Power';
import Sensors from './components/sensors/Sensors';
import ReferenceSystems from './components/reference-systems/ReferenceSystems';
import Thrusters from './components/thrusters/Thrusters';
import Settings from './components/settings/Settings';
import SimulatorControl from './components/simulator-control/Simulator-control';
import Menu from './components/menu/Menu';
import './App.css';

const menu = [
  { name: 'Dashboard', href: '/' },
  { name: 'Map', href: '/map' },
  { name: 'Control', href: '/control' },
  { name: 'Power', href: '/power' },
  { name: 'Thrusters', href: '/thrusters' },
  { name: 'Sensors', href: '/sensors' },
  { name: 'Reference systems', href: '/reference-systems' },
  { name: 'Settings', href: '/settings' },
];

const App = () =>
  (
    <div className="container">
      <Menu items={menu} />

      <main>
        <SimulatorControl />

        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/map" component={Map} />
          <Route path="/control" component={Control} />
          <Route path="/power" component={Power} />
          <Route path="/sensors" component={Sensors} />
          <Route path="/reference-systems" component={ReferenceSystems} />
          <Route path="/settings" component={Settings} />
          <Route path="/thrusters" component={Thrusters} />
        </Switch>
      </main>
    </div>
  );

export default App;
