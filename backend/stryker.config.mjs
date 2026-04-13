// @ts-check
const config = {
  packageManager: "npm",
  reporters: ["html", "clear-text"],
  testRunner: "jest",
  coverageAnalysis: "off",

  jest: {
    enableFindRelatedTests: false
  },

  mutate: [
    "riskCalculator.js",
    "server.js",
    "routes/**/*.js",
    "controllers/**/*.js",
    "config/**/*.js"
  ],
};

export default config;