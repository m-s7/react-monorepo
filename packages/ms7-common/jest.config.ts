export default {
    testEnvironment: 'jsdom',
    verbose: true,
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    transform: {
        '^.+\\.[jt]sx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    // setupFilesAfterEnv: [
    //     '<rootDir>/src/setupTests.ts',
    // ],
}
