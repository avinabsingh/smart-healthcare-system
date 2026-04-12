// @ts-check
const config = {
  packageManager: "npm",
  reporters: ["html", "clear-text"],
  testRunner: "jest",
  coverageAnalysis: "off",   // 🔥 IMPORTANT CHANGE

  jest: {
    enableFindRelatedTests: false
  },

  mutate: [
    "server.js",
    "routes/**/*.js",
    "controllers/**/*.js",
    "config/**/*.js"
  ],
};

export default config;