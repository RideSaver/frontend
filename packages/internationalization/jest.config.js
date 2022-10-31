/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    displayName: "Internationalization",
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]sx?$': ['ts-jest', {
            tsconfig: './tsconfig.json',
        }],
    },
};