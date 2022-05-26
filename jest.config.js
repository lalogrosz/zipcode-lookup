/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
const { pathsToModuleNameMapper } = require("ts-jest");

module.exports = {
  clearMocks: true,
  resetMocks: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "js", "tsx", "jsx", "json"],
  roots: ["./"],
  testEnvironment: "node",
  preset: "ts-jest",
  modulePaths: ["<rootDir>"],
  transformIgnorePatterns: [`/node_modules/`]
};
