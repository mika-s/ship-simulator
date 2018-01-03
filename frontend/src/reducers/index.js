import initialState from './initialstate';
import VesselModel from './vesselmodel/VesselModel';
import vesselmodelReducer from './vesselmodel/vesselmodel.reducer';
import environmentReducer from './environment/environment.reducer';
import shipReducer from './ship/ship.reducer';
import simulationReducer from './simulation/simulation.reducer';
import timeseriesReducer from './timeseries/timeseries.reducer';
import uiReducer from './ui/ui.reducer';

export default function rootreducer(state = initialState, action) {
  let forces;
  let model;

  if (action.type === 'SIMULATE' || action.type === 'STOP_SIMULATION') {
    forces = VesselModel.calculateForces(state.ship.thrusters, state.environment.wind.forces);

    model = VesselModel.calculatePosition(
      state.vesselmodel.mass,
      state.vesselmodel.drag,
      forces,
      state.vesselmodel.model.position,
      state.vesselmodel.model.positionInMeters,
      state.vesselmodel.model.velocity,
    );
  }

  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        timeseries: timeseriesReducer(
          state.timeseries, action, state.simulation.time,
          model, state.ship.sensors,
        ),
        simulation: simulationReducer(state.simulation, action),
        environment: environmentReducer(
          state.environment, action, state.ui.wind, model.velocity,
          model.position.heading, state.vesselmodel.dimensions, state.vesselmodel.wind,
        ),
        ship: shipReducer(state.ship, action, model, state.ui.thrusters, state.environment.wind),
        vesselmodel: vesselmodelReducer(state.vesselmodel, action, model, forces),
      };
    case 'PAUSE_SIMULATION':
      return {
        ...state,
        simulation: simulationReducer(state.simulation, action),
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        timeseries: timeseriesReducer(state.timeseries, action),
        simulation: simulationReducer(state.simulation, action),
        ship: shipReducer(state.ship, action, model, state.ui.thrusters),
        vesselmodel: vesselmodelReducer(state.vesselmodel, action),
      };
    case 'SET_THRUSTER_DEMAND':
      return {
        ...state,
        ui: uiReducer(state.ui, action),
      };
    case 'SET_WIND_SPEED':
      return {
        ...state,
        ui: uiReducer(state.ui, action),
      };
    case 'SET_WIND_DIRECTION':
      return {
        ...state,
        ui: uiReducer(state.ui, action),
      };
    case 'SET_DASHBOARD_PANE':
      return {
        ...state,
        ui: uiReducer(state.ui, action),
      };
    default:
      return state;
  }
}
