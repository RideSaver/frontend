/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    displayName: "Redux Store",
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]sx?$': ['ts-jest', {
            tsconfig: './tsconfig.json',
        }],
    },
};