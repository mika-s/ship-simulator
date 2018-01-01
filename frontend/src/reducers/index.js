import initialState from './initialstate';
import VesselModel from './vesselmodel/VesselModel';
import vesselmodelReducer from './vesselmodel/vesselmodel.reducer';
import environmentReducer from './environment/environment.reducer';
import shipReducer from './ship/ship.reducer';
import simulationReducer from './simulation/simulation.reducer';
import uiReducer from './ui/ui.reducer';

export default function rootreducer(state = initialState, action) {
  let model;

  if (action.type === 'SIMULATE' || action.type === 'STOP_SIMULATION') {
    model = VesselModel.calculatePosition(
      state.vesselmodel.mass,
      state.vesselmodel.drag,
      state.vesselmodel.forces,
      state.vesselmodel.model.position,
      state.vesselmodel.model.positionInMeters,
      state.vesselmodel.model.velocity,
    );
  }

  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        simulation: simulationReducer(state.simulation, action),
        environment: environmentReducer(state.environment, action),
        ship: shipReducer(state.ship, action, model, state.ui.thrusters),
        vesselmodel: vesselmodelReducer(state.vesselmodel, action, model),
      };
    case 'PAUSE_SIMULATION':
      return {
        ...state,
        simulation: simulationReducer(state.simulation, action),
      };
    case 'STOP_SIMULATION':
      return {
        ...state,
        simulation: simulationReducer(state.simulation, action),
        ship: shipReducer(state.ship, action, model, state.ui.thrusters),
        vesselmodel: vesselmodelReducer(state.vesselmodel, action),
      };
    case 'SET_THRUSTER_DEMAND':
      return {
        ...state,
        ui: uiReducer(state.ui, action),
      };
    default:
      return state;
  }
}
