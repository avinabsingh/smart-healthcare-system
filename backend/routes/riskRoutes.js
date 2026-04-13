const express = require("express");
const router = express.Router();


const calculateRisk = require("../riskCalculator");

router.post("/risk", (req, res) => {
  try {
    
    const result = calculateRisk(req.body);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Risk calculation failed" });
  }
});

module.exports = router;