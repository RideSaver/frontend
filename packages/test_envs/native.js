/** @type {import('ts-jest').JestConfigWithTsJest} */
/* eslint-env node */

import commonPreset from "./jest-preset";
import reactNativePreset from "react-native/jest-preset";

const config = {
    ...commonPreset,
    ...reactNativePreset,
    transform: {
        "^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$": require.resolve(
            "./jest/assetFileTransformer.js"
        ),
        ...commonPreset.transform,
    },
};

export default config;
