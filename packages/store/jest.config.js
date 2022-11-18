/** @type {import('ts-jest').JestConfigWithTsJest} */
/* eslint-env node */

module.exports = {
    displayName: "Redux Store",
    testEnvironment: "node",
    preset: "react-native",
    transform: {
        // '^.+\\.[tj]sx?$': ['ts-jest', {
        //     tsconfig: './tsconfig.json',
        // }],
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
};
