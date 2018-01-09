import environmentInitialState from './environment/initialstate';
import simulatorInitialState from './simulation/initialstate';
import shipInitialState from './ship/initialstate';
import timeseriesInitialState from './timeseries/initialstate';
import vesselModelInitialState from './vesselmodel/initialstate';
import uiInitialState from './ui/initialstate';
import InitialVessel from '../Vessel.json';

const initialState = {
  ui: uiInitialState(InitialVessel),
  timeseries: timeseriesInitialState(),
  simulation: simulatorInitialState(),
  environment: environmentInitialState(),
  ship: shipInitialState(InitialVessel),
  vesselmodel: vesselModelInitialState(InitialVessel),
};

export default initialState;
