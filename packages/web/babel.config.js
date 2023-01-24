module.exports = {
    presets: [
        "@babel/preset-typescript",
        "@babel/preset-react"
    ],
    plugins: [
        "@babel/plugin-proposal-export-namespace-from",
        'react-native-reanimated/plugin',
    ]
    // rootMode: "upward"
};
