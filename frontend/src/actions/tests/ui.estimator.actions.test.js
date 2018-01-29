import * as actions from '../ui.estimator.actions';

it('should create an action to change alpha for heading', () => {
  const alpha = 0.8;

  const expectedAction = {
    type: 'SET_ALPHA_FOR_HEADING',
    payload: {
      alpha,
    },
  };

  expect(actions.setAlphaForHeading(alpha)).toEqual(expectedAction);
});

it('should create an action to change beta for heading', () => {
  const beta = 0.8;

  const expectedAction = {
    type: 'SET_BETA_FOR_HEADING',
    payload: {
      beta,
    },
  };

  expect(actions.setBetaForHeading(beta)).toEqual(expectedAction);
});
