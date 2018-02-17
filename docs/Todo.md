# Todo

## Design

Find a suitable value for dragYawSway.
Find better current load methods in general.
Fix current model with respect to drag.yaw * velocity.r.

Make all forms controller (thruster stuff).

Improve high-speed model.

Fix thruster pane wrt. Settings.

Create speed controller for autopilot.

For graphs with two axes: specify which min and max belongs to what graph.

Auto axis per graph, instead of per pane.

Store at least 5 minutes of data. Be able to choose timespan for a graph.

Docstrings everywhere.

Unit test everything testable.

Heading graph should show gyro heading (or filtered gyro heading).

Add some margins or padding to the graphs on the dashboard to prevent
the axes from not being shown.

Fix lever values when changing mode or stopping the simulator.

Refactor panes into more generalized types?

Store and show total PID values.

## Structure

VesselModel calculations in middleware?
