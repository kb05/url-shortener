import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  maxWorkers: 1,
  forceExit: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    },
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
  },
  globalSetup: "/usr/src/project/tests/jest-global-setup.js"
};

export default config;
