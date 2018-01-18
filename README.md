# Ship-simulator

[![Build Status](https://travis-ci.org/mika-s/ship-simulator.svg?branch=production)](https://travis-ci.org/mika-s/ship-simulator)

This is a project that's trying to create a realistic ship simulator in Javascript.
The goal is to make the simulator mimic a real ship as much as possible, not to
be a game.

The technologies behind the project are React and Node. The frontend runs the
simulator itself, Node is only used to host the application. The simulator
can therefore run offline without problems.

State is handled by Redux. All business logic lies in the reducers. The React
components are only used to handle input and output.

## Installing

Requirements: [Node 8.x](https://nodejs.org/en/) or later, with npm, and a modern browser.

```
git clone https://github.com/mika-s/ship-simulator.git
cd ship-simulator
npm install
```

## Running

Locally without Node:

```
cd frontend
npm start
```

On a server:

```
npm start
```
and then point your browser to the server's IP address.
