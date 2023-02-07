/* eslint-env node */

module.exports = {
    presets: ["@babel/preset-typescript", "@babel/preset-react"],
    plugins: [
        "macros", 
        "react-native-reanimated/plugin",
        "@rnmapbox/maps",
            {
                "RNMapboxMapsImpl": "mapbox",
                "RNMapboxMapsDownloadToken": "sk.ey...qg"
            }
    ],
    // root: __dirname,
    // rootMode: "root"
};
