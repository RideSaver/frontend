/** @type {import('ts-jest').JestConfigWithTsJest} */
/* eslint-env node */


module.exports = {
    displayName: "Components",
    preset: "react-native",
    testEnvironment: "node",
    transform: {
        // "^.+\\.tsx?$": [
        //     "ts-jest",
        //     {
        //         babelConfig: true,
        //     },
        // ],
        "^.+\\.[jt]sx?$": "babel-jest",
    },
    transformIgnorePatterns: [
        "node_modules/(?!(react-native|react-native-iphone-x-helper|@react-native(-community)?)/)",
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
