import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Map from './components/map/Map';
import Power from './components/power/Power';
import Sensors from './components/sensors/Sensors';
import ReferenceSystems from './components/reference-systems/ReferenceSystems';
import Thrusters from './components/thrusters/Thrusters';
import Settings from './components/settings/Settings';
import SimulatorControl from './components/simulator-control/Simulator-control';
import Menu from './components/menu/Menu';

const App = () =>
  (
    <div className="container">
      <Menu />

      <main>
        <SimulatorControl />

        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/map" component={Map} />
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
