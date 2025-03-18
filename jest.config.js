module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/**/**/*.spec.ts'],
  setupFilesAfterEnv: ['./jest.setup.js'],
};
