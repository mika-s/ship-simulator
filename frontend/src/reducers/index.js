import initialState from './initialstate';
import { calculateForces, calculatePosition } from './vesselmodel/vessel.util';
import controlReducer from './control/control.reducer';
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
    forces = calculateForces(
      state.ship.thrusters,
      state.environment.wind.forces,
      state.environment.current.forces,
    );

    model = calculatePosition(
      state.vesselmodel.mass,
      state.vesselmodel.drag,
      forces,
      state.vesselmodel.model,
      state.environment.current,
    );
  }

  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,

        control: controlReducer(state.control, action, state.ui.control),
        timeseries: timeseriesReducer(
          state.timeseries, action, state.simulation.time,
          model, state.ship.sensors,
        ),
        simulation: simulationReducer(state.simulation, action),
        environment: environmentReducer(
          state.environment, action, state.ui.current, state.ui.wind, model.velocity,
          model.position.heading, state.vesselmodel.dimensions,
          state.vesselmodel.wind, state.vesselmodel.drag,
        ),
        ship: shipReducer(state.ship, action, model, state.ui.thrusters, state.environment.wind),
        vesselmodel: vesselmodelReducer(
          state.vesselmodel, action,
          model, forces, state.ui.position,
        ),
      };
    case 'PAUSE_SIMULATION':
      return {
        ...state,
        simulation: simulationReducer(state.simulation, action),
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        control: controlReducer(state.control, action, state.ui.control),
        timeseries: timeseriesReducer(state.timeseries, action),
        simulation: simulationReducer(state.simulation, action),
        ship: shipReducer(state.ship, action, model, state.ui.thrusters),
        vesselmodel: vesselmodelReducer(
          state.vesselmodel, action,
          model, forces, state.ui.position,
        ),
        ui: uiReducer(state.ui, action),
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
    case 'SET_CURRENT_SPEED':
      return {
        ...state,
        ui: uiReducer(state.ui, action),
      };
    case 'SET_CURRENT_DIRECTION':
      return {
        ...state,
        ui: uiReducer(state.ui, action),
      };
    case 'SET_INITIAL_POSITION':
      return {
        ...state,
        vesselmodel: vesselmodelReducer(
          state.vesselmodel, action,
          model, forces, state.ui.position,
        ),
        ui: uiReducer(state.ui, action),
      };
    case 'SET_DASHBOARD_PANE':
      return {
        ...state,
        ui: uiReducer(state.ui, action),
      };
    case 'INC_ZOOM_LEVEL':
      return {
        ...state,
        ui: uiReducer(state.ui, action),
      };
    case 'DEC_ZOOM_LEVEL':
      return {
        ...state,
        ui: uiReducer(state.ui, action),
      };
    case 'TOGGLE_MOTION_TYPE':
      return {
        ...state,
        ui: uiReducer(state.ui, action),
      };
    case 'SET_CONTROL_MODE':
      return {
        ...state,
        ui: uiReducer(state.ui, action),
      };
    default:
      return state;
  }
}
