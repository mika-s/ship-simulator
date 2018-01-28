import controlInitialState from './control/initialstate';
import estimatorInitialState from './estimator/initialstate';
import environmentInitialState from './environment/initialstate';
import simulatorInitialState from './simulation/initialstate';
import shipInitialState from './ship/initialstate';
import timeseriesInitialState from './timeseries/initialstate';
import vesselModelInitialState from './vesselmodel/initialstate';
import uiInitialState from './ui/initialstate';
import InitialVessel from '../settings/Vessel.json';
import InitialEstimator from '../settings/Estimator.json';
import InitialController from '../settings/Controller.json';

const initialState = {
  control: controlInitialState(InitialController),
  estimator: estimatorInitialState(InitialVessel, InitialEstimator),
  ui: uiInitialState(InitialVessel),
  timeseries: timeseriesInitialState(),
  simulation: simulatorInitialState(),
  environment: environmentInitialState(),
  ship: shipInitialState(InitialVessel),
  vesselmodel: vesselModelInitialState(InitialVessel),
};

export default initialState;
