import { combineReducers } from 'redux';
import simulation from './simulation.reducer';
import vesselmodel from './vesselmodel.reducer';
import wind from './wind.reducer';

export default combineReducers({
  simulation,
  vesselmodel,
  wind,
});
