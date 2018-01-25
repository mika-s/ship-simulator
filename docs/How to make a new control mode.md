# How to make a new control mode

- Add a new mode to vesselControlMode in util/enums.js.
- Add a new component for the control mode in the components/control folder.
  Copy/paste from Lever.jsx, for example, for the initial content.
- Add a new button in components/control/control.jsx. Add the component too,
  with conditions on whether to show it or not.
- Create a new object in state.ui.control with the name of the new control mode.
  It should contain all the UI variables for the mode.
- Create a new object in state.control with the name of the control made.
  It should contain all the control variables for the mode.
- Add the UI to control logic in the reducers.
