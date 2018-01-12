import { calculateFrontalWindArea, calculateLateralWindArea } from '../vesselmodel.util';

/* calculateFrontalWindArea() */

it('calculateFrontalWindArea(20, 25) = 400', () => {
  const area = calculateFrontalWindArea(20, 25);
  expect(area).toEqual(400);
});

/* calculateLateralWindArea() */

it('calculateLateralWindArea(100, 25) = 1000', () => {
  const area = calculateLateralWindArea(100, 25);
  expect(area).toEqual(1000);
});

