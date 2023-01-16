/* global module */
module.exports = {
    "extends": "semantic-release-monorepo",
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        ["semantic-release-react-native", {
            androidPath: "packages/*/android",
            iosPath: "packages/*/ios",
            "versionStrategy": {
                "android": { "buildNumber": "increment" },
                "ios": { "buildNumber": "strict" }
            }
        }],
        [
            "@semantic-release/git",
            {
                "assets": [
                    "**/package.json",
                    "packages/*/ios/**/Info.plist",
                    "packages/*/ios/**/*.pbxproj",
                    "packages/*/android/app/build.gradle",
                ],
                "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
            },
        ],
    ]
};