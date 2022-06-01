export default {
    testEnvironment: 'jsdom',
    verbose: true,
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    moduleNameMapper: {
        '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^.+\\.svg$': 'jest-svg-transformer',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^Dummy/(.*)$': '<rootDir>/src/modules/dummy/$1',
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    setupFilesAfterEnv: [
        '<rootDir>/src/setupTests.ts',
    ],
}
