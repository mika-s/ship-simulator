import initialState from './initialstate';
import { calculateControllerDemands, calculateThrusterDemands } from './control/control.util';
import { calculateForces, calculatePosition } from './vesselmodel/vessel.util';
import controlReducer from './control/control.reducer';
import vesselmodelReducer from './vesselmodel/vesselmodel.reducer';
import environmentReducer from './environment/environment.reducer';
import shipReducer from './ship/ship.reducer';
import simulationReducer from './simulation/simulation.reducer';
import timeseriesReducer from './timeseries/timeseries.reducer';
import uiReducer from './ui/ui.reducer';

export default function rootreducer(state = initialState, action) {
  let demands = [];
  let controllerData = { forces: {}, data: {} };
  let forces = { thrusters: 0, wind: 0, current: 0 };
  let model = { position: 0, positionInMeters: 0, velocity: 0 };

  if (action.type === 'SIMULATE' || action.type === 'STOP_SIMULATION') {
    // Controller
    controllerData = calculateControllerDemands(
      state.control,
      state.ship.sensors.gyrocompasses,
    );

    // Thruster allocation
    demands = calculateThrusterDemands(
      controllerData,
      state.control,
      state.ship.thrusters,
      state.ui.thrusters,
    );

    // Model
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

  return {
    ...state,

    control: controlReducer(
      state.control, action, state.ui.control,
      controllerData.data.summedHeadingError,
    ),

    timeseries: timeseriesReducer(
      state.timeseries, action, state.simulation.time,
      model, state.ship.sensors, state.ship.referencesystems,
    ),

    simulation: simulationReducer(state.simulation, action),

    environment: environmentReducer(
      state.environment, action, state.ui.current, state.ui.wind, model.velocity,
      model.position.heading, state.vesselmodel.dimensions,
      state.vesselmodel.wind, state.vesselmodel.drag,
    ),

    ship: shipReducer(
      state.ship, action, model, state.control,
      demands, state.environment.wind,
    ),

    vesselmodel: vesselmodelReducer(
      state.vesselmodel, action,
      model, forces, state.ui.position,
    ),

    ui: uiReducer(state.ui, action, state.control),
  };
}
