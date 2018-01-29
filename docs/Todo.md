# Todo

## Design

In the environment reducer the wind speed and direction is set from the UI wind
speed and direction during SIMULATE. Should maybe read from UI wind only when
SET_WIND_SPEED and SET_WIND_DIRECTION is used.

Find a suitable value for dragYawSway.
Find better current load methods in general.
Fix current model with respect to drag.yaw * velocity.r.

Make all forms controller (thruster stuff).

Improve high-speed model.

Fix thruster pane wrt. Settings.

Create speed controller for autopilot.

For graphs with two axes: specify which min and max belongs to what graph.

## Structure

VesselModel calculations in middleware?
