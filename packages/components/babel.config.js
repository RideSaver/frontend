/* eslint-env node */

module.exports = {
    presets: [
        "@babel/preset-typescript",
        "@babel/preset-react",
        "module:metro-react-native-babel-preset",
    ],
    plugins: ["macros"],
    // rootMode: "upward"
};
