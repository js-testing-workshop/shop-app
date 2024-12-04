module.exports = {
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/__ mocks __/fileMock.js',
    },
    collectCoverage: true,
    setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],

    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                diagnostics: {
                    ignoreCodes: [1343],
                },
                astTransformers: {
                    before: [
                        {
                            path: 'node_modules/ts-jest-mock-import-meta',
                            options: {
                                metaObjectReplacement: {
                                    env: {
                                        // Replicate as .env.local
                                        VITE_API_PATH: 'http://localhost:3001',
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        ],
    },
}