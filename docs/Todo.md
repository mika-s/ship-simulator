# Todo

## Design

The simulation timer is not implemented in Redux. The interval timer is implemented
in the front-end and it's calling the SIMULATE action for every simulation tick.

So,

- Is PAUSE_SIMULATION really needed? (Maybe for setting the simulation state).
- Should STOP_SIMULATION be renamed to RESET_SIMULATOR?

In the environment reducer the wind speed and direction is set from the UI wind
speed and direction during SIMULATE. Should maybe read from UI wind only when
SET_WIND_SPEED and SET_WIND_DIRECTION is used.

The root reducer should be split in simulation and UI stuff.

Find a suitable value for dragYawSway.

Find better current load methods in general.
