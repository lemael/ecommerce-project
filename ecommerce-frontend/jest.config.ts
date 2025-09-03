import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "clover"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/*.test.(ts|tsx)"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testEnvironment: "jsdom",
  globals: {
    TextEncoder,
    TextDecoder,
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};

export default config;
