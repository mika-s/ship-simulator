import controlInitialState from './control/initialstate';
import estimatorInitialState from './estimator/initialstate';
import environmentInitialState from './environment/initialstate';
import simulatorInitialState from './simulation/initialstate';
import shipInitialState from './ship/initialstate';
import timeseriesInitialState from './timeseries/initialstate';
import vesselModelInitialState from './vesselmodel/initialstate';
import uiInitialState from './ui/initialstate';
import InitialVessel from '../Vessel.json';

const initialState = {
  control: controlInitialState(),
  estimator: estimatorInitialState(InitialVessel),
  ui: uiInitialState(InitialVessel),
  timeseries: timeseriesInitialState(),
  simulation: simulatorInitialState(),
  environment: environmentInitialState(),
  ship: shipInitialState(InitialVessel),
  vesselmodel: vesselModelInitialState(InitialVessel),
};

export default initialState;
