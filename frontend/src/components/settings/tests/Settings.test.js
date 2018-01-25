import React from 'react';
import ReactDOM from 'react-dom';
import { UnconnectedSettings } from '../Settings';

it('renders without crashing', () => {
  function setWindSpeed() { }
  function setWindDirection() { }
  function setCurrentSpeed() { }
  function setCurrentDirection() { }
  function setPosition() { }

  const div = document.createElement('div');
  ReactDOM.render(<UnconnectedSettings
    currentSpeed={0.5}
    currentDirection={130}
    windSpeed={5.0}
    windDirection={100}
    position={{ latitude: 50.0, longitude: 3.0 }}
    setWindSpeed={setWindSpeed}
    setWindDirection={setWindDirection}
    setCurrentSpeed={setCurrentSpeed}
    setCurrentDirection={setCurrentDirection}
    setPosition={setPosition}
  />, div);
});
