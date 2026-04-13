const calculateRisk = require("./riskCalculator");

test("High Risk Case", () => {
  const result = calculateRisk({
    age: 50,
    bmi: 30,
    bp: "high",
    sugar: "high",
    smoking: "yes",
  });

  expect(result.risk).toBe(100);
  expect(result.level).toBe("HIGH");
});

test("Low Risk Case", () => {
  const result = calculateRisk({
    age: 20,
    bmi: 20,
    bp: "normal",
    sugar: "normal",
    smoking: "no",
  });

  expect(result.risk).toBe(0);
  expect(result.level).toBe("LOW");
});

test("Medium Risk Case", () => {
  const result = calculateRisk({
    age: 45,
    bmi: 26,
    bp: "normal",
    sugar: "normal",
    smoking: "no",
  });

  expect(result.risk).toBe(40);
  expect(result.level).toBe("MEDIUM");
});