import '@testing-library/jest-dom'

jest.mock('axios', () => ({
    ...(jest.requireActual('axios')),
    create: () => ({
        get: jest.fn(),
        interceptors: {
            request: { eject: jest.fn(), use: jest.fn() },
            response: { eject: jest.fn(), use: jest.fn() },
        },
    }),
}))
