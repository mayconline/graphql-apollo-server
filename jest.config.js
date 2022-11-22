export default {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/**/**/*.spec.ts'],
};
