import { Platform, NativeModules } from "react-native";


/**
 * This function tries to retrieve the locales that the user has defined as thier preferred languages (in order of preference).
 * @returns The user preferred locales (in order of preference)
 */
export default function* getLocale(): IterableIterator<string> {
    switch (Platform.OS) {
        case "ios":
            const locale = NativeModules.I18nManager.localeIdentifier;
            if (!!locale) {
                return locale;
            }
            // iOS 13
            yield* NativeModules.SettingsManager.settings.AppleLanguages as string[];
            return;
        case "android":
            return NativeModules.I18nManager.localeIdentifier;
        case "web":
            yield* navigator.languages;
            return navigator.language;
        default:
            throw new Error("Unknow architecture - cannot retrieve user locale");
    }
}
