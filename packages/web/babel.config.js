module.exports = {
    presets: [
        "@babel/preset-typescript",
        "@babel/preset-react"
    ],
    plugins: [
        "@babel/plugin-proposal-export-namespace-from",
        "react-native-reanimated/plugin",
        "@rnmapbox/maps",
            {
                "RNMapboxMapsImpl": "mapbox",
                "RNMapboxMapsDownloadToken": "sk.ey...qg"
            }
    ]
    // rootMode: "upward"
};
