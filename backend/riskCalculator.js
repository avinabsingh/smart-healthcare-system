function calculateRisk({ age, bmi, bp, sugar, smoking }) {
  let risk = 0;

  if (age > 40) risk += 20;
  if (bmi > 25) risk += 20;
  if (bp === "high") risk += 20;
  if (sugar === "high") risk += 25;
  if (smoking === "yes") risk += 15;

  let level = "LOW";
  if (risk > 60) level = "HIGH";
  else if (risk > 30) level = "MEDIUM";

  return {
    risk,
    level,
    advice:
      level === "HIGH"
        ? "Consult a doctor immediately"
        : level === "MEDIUM"
        ? "Maintain a healthy lifestyle"
        : "You are in good condition",
  };
}

module.exports = calculateRisk;