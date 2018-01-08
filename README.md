[![Build Status](https://travis-ci.org/mika-s/ship-simulator.svg?branch=production)](https://travis-ci.org/mika-s/ship-simulator)

This is a project that's trying to create a realistic ship simulator in Javascript.
The goal is to make the simulator mimic a real ship as much as possible, not to
be a game.

The technologies behind the project are React and Node. The frontend runs the
simulator itself, Node is only used to host the application. The simulator
can therefore run offline without problems.

State is handled by Redux. All business logic lies in the reducers. The React
components are only used to handle input and output.
