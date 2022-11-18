/** @type {import('ts-jest').JestConfigWithTsJest} */

const config = {
    testEnvironment: "node",
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
};

export default config;