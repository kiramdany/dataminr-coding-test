/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

process.env.USER = 'postgres'
process.env.PGPASSWORD = 'example'

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/jest.globalSetup.js',
  globals: {
    'ts-jest': {
      diagnostics: false,
      ignoreCodes: [2571, 6031, 18003, 2305],
    },
  },
}
