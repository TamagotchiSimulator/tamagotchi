const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    nanoid: require.resolve("nanoid"),
  },
  transform: {
    ...tsJestTransformCfg,
  },
};
