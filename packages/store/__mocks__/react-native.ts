import { jest } from "@jest/globals";

jest.mock("react-native", () => {
    //Mock the default export and named export 'foo'
    let rnMock = {
        __esModule: true,
        languages: ["en_PS", "en_US"],
        Platform: {
            OS: "web",
        },
    };
    return {
        ...rnMock,
        NativeModules: {
            I18nManager: {
                localeIdentifier: rnMock.languages[0],
            },
            SettingsManager: {
                settings: {
                    AppleLanguages: rnMock.languages,
                },
            },
        },
    };
});
