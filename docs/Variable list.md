# Important variables:

## Vessel

| Variable                    | Dimension | Unit | Description                                   |
|-----------------------------|-----------|------|-----------------------------------------------|
| dimensions.lpp              | distance  | m    | Length between perpendiculars for the vessel. |
| dimensions.loa              | distance  | m    | Length over all for the vessel. Optional.     |
| dimensions.breadth          | distance  | m    | Breadth of the vessel.                        |
| dimensions.draft            | distance  | m    | Draft of the vessel                           |
| dimensions.blockCoefficient | -         | -    | Block coefficient of the vessel.              |
| dimensions.displacement     | mass      | t    | The displacement of the vessel.               |

| Variable                 | Dimension     | Unit  | Description                                                                                             |
|--------------------------|---------------|-------|---------------------------------------------------------------------------------------------------------|
| model.position.latitude  | distance      | °     | Vessel's latitude in decimal degrees. Positive value is North, negative is South.                       |
| model.position.longitude | distance      | °     | Vessel's longitude in decimal degrees. Positive value is East, negative is West.                        |
| model.position.heading   | angle         | rad   | Vessel's heading. rad is used internally in the model. It's converted to ° in the Gyrocompass objects.  |
| model.velocity.u         | speed         | m/s   | Vessel's speed in surge.                                                                                |
| model.velocity.v         | speed         | m/s   | Vessel's speed in sway.                                                                                 |
| model.velocity.r         | angular speed | rad/s | Vessel's rotation speed.                                                                                |

| Variable                    | Dimension | Unit | Description                        |
|-----------------------------|-----------|------|------------------------------------|
| forces.thrusters.surge      | force     | t    | Forces from thrusters in surge.    |
| forces.thrusters.sway       | force     | t    | Forces from thrusters in sway.     |
| forces.thrusters.yaw        | force     | t    | Forces from thrusters in yaw.      |
| forces.wind.surge           | force     | t    | Forces from wind in surge.         |
| forces.wind.sway            | force     | t    | Forces from wind in sway.          |
| forces.wind.yaw             | force     | t    | Forces from wind in yaw.           |
| forces.current.surge        | force     | t    | Forces from current in surge.      |
| forces.current.sway         | force     | t    | Forces from current in sway.       |
| forces.current.yaw          | force     | t    | Forces from current in yaw.        |

| Variable                    | Dimension | Unit | Description                                                  |
|-----------------------------|-----------|------|--------------------------------------------------------------|
| wind.coefficientCalcType    | string    | -    | Calculation method for wind coefficients.                    |
| wind.vesselType             | string    | -    | Vessel type for use with Blendermann.                        |
| wind.frontalArea            | area      | m^2  | The projected frontal area of the vessel.                    |
| wind.lateralArea            | area      | m^2  | The projected lateral area of the vessel.                    |
| wind.sL                     | distance  | m    | The moment arm of the wind in lateral direction.             |
| wind.superStructureHeight   | distance  | m    | The max height of the superstructure above the waterline.    |

| Variable        | Dimension | Unit     | Description                        |
|-----------------|-----------|----------|------------------------------------|
| mass.surge      | mass      | t        | Mass in surge.                     |
| mass.sway       | mass      | t        | Mass in sway.                      |
| mass.yaw        | moment    | tm       | Moment in yaw.                     |
| drag.surge      |           | ts^2/m^2 | Drag in surge.                     |
| drag.sway       |           | ts^2/m^2 | Drag in sway.                      |
| drag.yaw        |           | ts^2/m^3 | Drag in yaw.                       |
| drag.yawSway    |           |          | Drag in yaw due to sway velocity.  |

## Environment

| Variable              | Dimension  | Unit  | Description                         |
|-----------------------|------------|-------|-------------------------------------|
| wind.speed            | speed      | m/s   | The wind speed.                     |
| wind.direction        | angle      | °     | The direction of the wind.          |
| wind.forces.surge     | force      | T     | Force due to the wind, in surge.    |
| wind.forces.sway      | force      | T     | Force due to the wind, in sway.     |
| wind.forces.yaw       | moment     | Tm    | Moment due to the wind, in yaw.     |
| current.speed         | speed      | m/s   | The current speed.                  |
| current.direction     | angle      | °     | The current direction.              |
| current.forces.surge  | force      | T     | Force due to the current, in surge. |
| current.forces.sway   | force      | T     | Force due to the current, in sway.  |
| current.forces.yaw    | moment     | Tm    | Moment due to the current, in yaw.  |

## Sensors

| Variable               | Dimension  | Unit  | Description                                         |
|------------------------|------------|-------|-----------------------------------------------------|
| gyrocompass.number     | -          | -     | Gyrocompass number.                                 |
| gyrocompass.heading    | angle      | °     | The vessel's heading as read from the gyrocompass.  |
| mru.number             | -          | -     | MRU number.                                         |
| mru.roll               | angle      | °     | The roll of the vessel as read from the MRU.        |
| mru.pitch              | angle      | °     | The pitch of the vessel as read from the MRU.       |
| windsensor.number      | -          | -     | MRU number.                                         |
| windsensor.speed       | speed      | m/s   | The wind speed as read from the wind sensor.        |
| windsensor.direction   | angle      | °     | The wind direction as read from the wind sensor.    |

## Reference systems

| Variable               | Dimension  | Unit  | Description                            |
|------------------------|------------|-------|----------------------------------------|
| gps.number             | -          | -     | GPS number.                            |
| gps.position.latitude  | angle      | °     | The read latitude in decimal degrees.  |
| gps.position.longitude | angle      | °     | The read longitude in decimal degrees. |

## Thrusters
