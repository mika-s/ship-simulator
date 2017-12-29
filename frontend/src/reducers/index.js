import initialState from './initialstate';
import VesselModel from './NewVesselModel';
import vesselmodelReducer from './vesselmodel.reducer';
import environmentReducer from './environment.reducer';
import shipReducer from './ship.reducer';
import simulationReducer from './simulation.reducer';

export default function rootreducer(state = initialState, action) {
  const model = VesselModel.calculatePosition(
    state.vesselmodel.mass,
    state.vesselmodel.drag,
    state.vesselmodel.forces,
    state.vesselmodel.model.position,
    state.vesselmodel.model.positionInMeters,
    state.vesselmodel.model.velocity,
  );

  switch (action.type) {
    case 'SIMULATE':
      return {
        ...state,
        simulation: simulationReducer(state.simulation, action),
        environment: environmentReducer(state.environment, action),
        ship: shipReducer(state.ship, action),
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
        vesselmodel: vesselmodelReducer(state.vesselmodel, action),
      };
    default:
      return state;
  }
}
