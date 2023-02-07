/* eslint-env node */

module.exports = {
    presets: ["@babel/preset-typescript", "@babel/preset-react"],
    plugins: [
        "macros", 
        "react-native-reanimated/plugin"
    ],
    // root: __dirname,
    // rootMode: "root"
};
