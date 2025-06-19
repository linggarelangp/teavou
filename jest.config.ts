import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: "v8",
  projects: [
    {
      displayName: 'api',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/__tests__/api/**/*.test.ts'],
      moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
      transform: { "^.+\\.(ts|tsx)$": "ts-jest" },
    },
    {
      displayName: 'react',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/__tests__/components/**/*.test.ts'],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
    }
  ],
};

export default config;
