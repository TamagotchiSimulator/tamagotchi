const { createDefaultEsmPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultEsmPreset({
  tsconfig: "tsconfig.app.json",
  module: "Node16", // or Node18/NodeNext
  target: "ESNext",
  esModuleInterop: true,
  isolatedModules: true,
}).transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    nanoid: require.resolve("nanoid"),
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {
    ...tsJestTransformCfg,
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  fakeTimers: {
    enableGlobally: true,
  },
};
