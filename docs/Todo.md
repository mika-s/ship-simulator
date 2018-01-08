# Todo

## Design

The simulation timer is not implemented in Redux. The interval timer is implemented
in the front-end and it's calling the SIMULATE action for every simulation tick.

So,

- Is PAUSE_SIMULATION really needed?
- Should STOP_SIMULATION be renamed to RESET_SIMULATOR?
