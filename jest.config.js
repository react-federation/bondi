module.exports = {
  roots: ['packages'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': '@swc-node/jest'
  },
  collectCoverage: true,
  automock: false,
  collectCoverageFrom: ['packages/utils/**/**.ts', 'packages/utils/**/**.tsx'],
  moduleNameMapper: {
    '^cli/(.*)$': '<rootDir>/packages/cli/$1'
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  globals: {
    '@swc-node/jest': {
      tsconfig: './packages/config/tsconfig.json'
    }
  }
}
