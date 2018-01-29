export function setAlphaForHeading(alpha) {
  return {
    type: 'SET_ALPHA_FOR_HEADING',
    payload: {
      alpha,
    },
  };
}

export function setBetaForHeading(beta) {
  return {
    type: 'SET_BETA_FOR_HEADING',
    payload: {
      beta,
    },
  };
}
