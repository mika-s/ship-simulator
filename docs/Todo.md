# Todo

## Design

In the environment reducer the wind speed and direction is set from the UI wind
speed and direction during SIMULATE. Should maybe read from UI wind only when
SET_WIND_SPEED and SET_WIND_DIRECTION is used.

The root reducer should be split in simulation and UI stuff.

Find a suitable value for dragYawSway.
Find better current load methods in general.
Fix current model with respect to drag.yaw * velocity.r.

## Structure

VesselModel --> UI --> set store
