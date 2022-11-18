/* eslint-env node */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.[jt]sx?$": "babel-jest",
    },
    projects: ["packages/*/jest.config.js", "packages/*/jest.config.*.js"],
    clearMocks: true, // Clears the state of all mocks between tests (Why isn't this standard?)
    fakeTimers: {
        enableGlobally: true,
    },
    collectCoverageFrom: [
        "**/*.{js,jsx,ts,tsx}",
        "!**/node_modules/**",
        "!**/vendor/**",
        "!**/*.config.{js,ts}",
    ],
    // coverageProvider: "v8",
    watchPlugins: [
        "select-projects",
        "typeahead/filename",
        "typeahead/testname",
    ],
};
