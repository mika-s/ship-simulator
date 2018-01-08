function blendermann(windParams, dimensions, angleOfAttack) {
  /* eslint quote-props: ["error", "consistent"] */
  /* eslint object-curly-newline: "off" */

  const coefficientTable = {
    'Car carrier': { CDt: 0.95, CDl0: 0.55, CDlpi: 0.60, delta: 0.80, kappa: 1.2 },
    'Cargo vessel, loaded': { CDt: 0.85, CDl0: 0.65, CDlpi: 0.55, delta: 0.40, kappa: 1.7 },
    'Cargo vessel, container on deck': { CDt: 0.85, CDl0: 0.55, CDlpi: 0.50, delta: 0.40, kappa: 1.4 },
    'Container ship, loaded': { CDt: 0.90, CDl0: 0.55, CDlpi: 0.55, delta: 0.40, kappa: 1.4 },
    'Destroyer': { CDt: 0.85, CDl0: 0.60, CDlpi: 0.65, delta: 0.65, kappa: 1.1 },
    'Diving support vessel': { CDt: 0.90, CDl0: 0.60, CDlpi: 0.80, delta: 0.55, kappa: 1.7 },
    'Drilling vessel': { CDt: 1.00, CDl0: 0.85, CDlpi: 0.92, delta: 0.10, kappa: 1.7 },
    'Ferry': { CDt: 0.90, CDl0: 0.45, CDlpi: 0.50, delta: 0.80, kappa: 1.1 },
    'Fishing vessel': { CDt: 0.95, CDl0: 0.70, CDlpi: 0.70, delta: 0.40, kappa: 1.1 },
    'Liquefied natural gas tanker': { CDt: 0.70, CDl0: 0.60, CDlpi: 0.65, delta: 0.50, kappa: 1.1 },
    'Offshore supply vessel': { CDt: 0.90, CDl0: 0.55, CDlpi: 0.80, delta: 0.55, kappa: 1.2 },
    'Passenger liner': { CDt: 0.90, CDl0: 0.40, CDlpi: 0.40, delta: 0.80, kappa: 1.2 },
    'Research vessel': { CDt: 0.85, CDl0: 0.55, CDlpi: 0.65, delta: 0.60, kappa: 1.4 },
    'Speed boat': { CDt: 0.90, CDl0: 0.55, CDlpi: 0.60, delta: 0.60, kappa: 1.1 },
    'Tanker, loaded': { CDt: 0.70, CDl0: 0.90, CDlpi: 0.55, delta: 0.40, kappa: 3.1 },
    'Tanker, in ballast': { CDt: 0.70, CDl0: 0.75, CDlpi: 0.55, delta: 0.40, kappa: 2.2 },
    'Tender': { CDt: 0.85, CDl0: 0.55, CDlpi: 0.55, delta: 0.65, kappa: 1.1 },
  };

  const { CDt, CDl0, CDlpi, delta, kappa } = coefficientTable[windParams.vesselType];

  let CDl;
  if (Math.abs(angleOfAttack) <= Math.PI / 2.0) {
    // For head wind.
    CDl = CDl0 * (windParams.frontalArea / windParams.lateralArea);
  } else {
    // For tail wind.
    CDl = CDlpi * (windParams.frontalArea / windParams.lateralArea);
  }

  const denominator = 1 - (0.5 * delta * (1 - (CDl / CDt)) * (Math.sin(2 * angleOfAttack) ** 2));

  const CX = -CDl * (windParams.lateralArea / windParams.frontalArea)
    * (Math.cos(angleOfAttack) / denominator);
  const CY = -CDt * (Math.sin(angleOfAttack) / denominator);
  const CK = kappa * CY;
  const CN = ((windParams.sL / dimensions.loa) - (0.18 * (angleOfAttack - (Math.PI / 2)))) * CY;

  return { CX, CY, CK, CN };
}

export default blendermann;
