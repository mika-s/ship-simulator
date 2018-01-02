# Important variables:

## Vessel

| Variable                    | Dimension | Unit | Description                                   |
|-----------------------------|-----------|------|-----------------------------------------------|
| dimensions.lpp              | distance  | m    | Length between perpendiculars for the vessel. |
| dimensions.loa              | distance  | m    | Length over all for the vessel. Optional.     |
| dimensions.breadth          | distance  | m    | Breadth of the vessel.                        |
| dimensions.draft            | distance  | m    | Draft of the vessel                           |
| dimensions.blockCoefficient | -         | -    | Block coefficient of the vessel.              |

| Variable                 | Dimension     | Unit  | Description                                                                                             |
|--------------------------|---------------|-------|---------------------------------------------------------------------------------------------------------|
| model.position.latitude  | distance      | °     | Vessel's latitude in decimal degrees. Positive value is North, negative is South.                       |
| model.position.longitude | distance      | °     | Vessel's longitude in decimal degrees. Positive value is East, negative is West.                        |
| model.position.heading   | angle         | rad   | Vessel's heading. rad is used internally in the model. It's converted to ° in the Gyrocompass objects.  |
| model.velocity.u         | speed         | m/s   | Vessel's speed in surge.                                                                                |
| model.velocity.v         | speed         | m/s   | Vessel's speed in sway.                                                                                 |
| model.velocity.r         | angular speed | rad/s | Vessel's rotation speed.                                                                                |

## Environment

wind.speed
wind.direction

current.speed
current.direction

## Sensors

gyrocompass.number
gyrocompass.heading

mru.number
mru.roll
mru.pitch

windsensor.number
windsensor.speed
windsensor.direction

## Reference systems

gps.number
gps.position.latitude
gps.position.longitude

## Thrusters
