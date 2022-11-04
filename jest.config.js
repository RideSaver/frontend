module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.[tj]sx?$": [
            "ts-jest",
            {
                tsconfig: "./tsconfig.json",
            },
        ],
    },
    projects: ["packages/*"],
    clearMocks: true, // Clears the state of all mocks between tests (Why isn't this standard?)
    fakeTimers: {
        enableGlobally: true
    },
};
