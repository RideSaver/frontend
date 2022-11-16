/** @type {import('ts-jest').JestConfigWithTsJest} */
/* eslint-env node */

module.exports = {
    displayName: "Web Client",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.[jt]sx?$": [
            "babel-jest",
            {
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            targets: {
                                node: "current",
                            },
                        },
                    ],
                ],
            },
        ],
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper: {
        "^react-native$": "react-native-web",
    },
    transformIgnorePatterns: [
        "node_modules\\/(?!(react-native(-[\\w\\d\\-]*)?|@react-native(-community)?)\\/)",
    ],
    coveragePathIgnorePatterns: ["scripts", "config", "node_modules", "build"],
    resetMocks: true,
};
