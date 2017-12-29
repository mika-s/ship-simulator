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

  return {
    ...state,
    simulation: simulationReducer(state.simulation, 'SOME_ACTION'),
    environment: environmentReducer(state.environment, 'SOME_ACTION'),
    ship: shipReducer(state.ship, 'SOME_ACTION'),
    vesselmodel: vesselmodelReducer(state.vesselmodel, 'SOME_ACTION', model),
  };
}
