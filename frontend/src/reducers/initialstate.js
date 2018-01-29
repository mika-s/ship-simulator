import controlInitialState from './control/initialstate';
import estimatorInitialState from './estimator/initialstate';
import environmentInitialState from './environment/initialstate';
import simulatorInitialState from './simulation/initialstate';
import shipInitialState from './ship/initialstate';
import timeseriesInitialState from './timeseries/initialstate';
import vesselModelInitialState from './vesselmodel/initialstate';
import uiInitialState from './ui/initialstate';
import initialVessel from '../settings/Vessel.json';
import initialEstimator from '../settings/Estimator.json';
import initialController from '../settings/Controller.json';

const initialState = {
  control: controlInitialState(initialController),
  estimator: estimatorInitialState(initialVessel, initialEstimator),
  ui: uiInitialState(initialVessel, initialEstimator),
  timeseries: timeseriesInitialState(),
  simulation: simulatorInitialState(),
  environment: environmentInitialState(),
  ship: shipInitialState(initialVessel),
  vesselmodel: vesselModelInitialState(initialVessel),
};

export default initialState;
