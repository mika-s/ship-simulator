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
  const {
    mass, drag, model: oldModel, wind, dimensions,
  } = state.vesselmodel;
  const { thrusters, sensors, referencesystems } = state.ship;
  const {
    control: uiControl, wind: uiWind, current: uiCurrent, position: uiPosition,
  } = state.ui;

  let demands = [];
  let controllerData = { forces: {}, data: {} };
  let forces = { thrusters: 0, wind: 0, current: 0 };
  let newModel = { position: 0, positionInMeters: 0, velocity: 0 };

  if (action.type === 'SIMULATE' || action.type === 'STOP_SIMULATION') {
    // Controller
    controllerData = calculateControllerDemands(
      state.control,
      sensors.gyrocompasses,
    );

    // Thruster allocation
    demands = calculateThrusterDemands(
      controllerData,
      state.control,
      thrusters,
      state.ui.thrusters,
    );

    // Model
    forces = calculateForces(
      thrusters,
      state.environment.wind.forces,
      state.environment.current.forces,
    );

    newModel = calculatePosition(
      mass, drag, forces, oldModel,
      state.environment.current,
    );
  }

  return {
    ...state,

    control: controlReducer(
      state.control, action, uiControl,
      controllerData.data.summedHeadingError,
    ),

    timeseries: timeseriesReducer(
      state.timeseries, action, state.simulation.time,
      newModel, sensors, referencesystems,
    ),

    simulation: simulationReducer(state.simulation, action),

    environment: environmentReducer(
      state.environment, action, uiCurrent, uiWind, newModel.velocity,
      newModel.position.heading, dimensions, wind, drag,
    ),

    ship: shipReducer(
      state.ship, action, newModel, state.control,
      demands, state.environment.wind,
    ),

    vesselmodel: vesselmodelReducer(state.vesselmodel, action, newModel, forces, uiPosition),

    ui: uiReducer(state.ui, action, state.control),
  };
}
