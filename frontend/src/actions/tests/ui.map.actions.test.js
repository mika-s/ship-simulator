import * as actions from '../ui.map.actions';

it('should create an action to increase the zoom level', () => {
  const expectedAction = {
    type: 'INC_ZOOM_LEVEL',
  };

  expect(actions.increaseZoomlevel()).toEqual(expectedAction);
});

it('should create an action to decrease the zoom level', () => {
  const expectedAction = {
    type: 'DEC_ZOOM_LEVEL',
  };

  expect(actions.decreaseZoomlevel()).toEqual(expectedAction);
});

it('should create an action to toggle the motion type', () => {
  const expectedAction = {
    type: 'TOGGLE_MOTION_TYPE',
  };

  expect(actions.toggleMotion()).toEqual(expectedAction);
});

