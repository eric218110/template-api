// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const tsConfig = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, { prefix: '<rootDir>' }),
  preset: 'ts-jest',
  testEnvironment: 'node'
};
