/* eslint-env node */

module.exports = {
    presets: [
        "@babel/preset-react",
        "module:metro-react-native-babel-preset",
    ],
    plugins: [
        "macros",
        "@rnmapbox/maps",
        {
            "RNMapboxMapsImpl": "mapbox",
            "RNMapboxMapsDownloadToken": "sk.ey...qg"
        }
    ],
    // rootMode: "upward"
};
