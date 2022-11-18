/**
 * A collection of utility functions and constants for dealing with internationalization.
 * @author Elias Schablowski
 * @format
 */

import config, { locales } from "../../lingui.config";
import { I18n, Messages, setupI18n } from "@lingui/core";

import * as plurals from "make-plural/plurals";

export type locale = typeof locales extends readonly (infer T)[] ? T : never;

export { locales };

const defaultLocale: string = [
    config.fallbackLocales?.default, // Try to default to default fallback
    config?.sourceLocale, // Use source locale if that fails
    config?.locales[0], // Use first locale if that fails
].filter((l) => typeof l === "string")[0] as string;

const i18n = setupI18n({
    locale: defaultLocale,
    locales: [].concat(locales),
    messages: {
        [defaultLocale]: require(`./locale/${defaultLocale}/messages.ts`),
    },
    localeData: {
        [defaultLocale]: {
            plurals: plurals[defaultLocale.split("-")[0]],
        },
    },
});
export default i18n;

export async function downloadMessages(locale: locale) {
    const messages = await import(`./locale/${locale}/messages.ts`);
    return messages.messages;
}

export async function loadLocale(
    locale: locale,
    messages: Messages,
    _i18n: I18n
) {
    _i18n.loadLocaleData(plurals[locale.split("-")[0]]);
    _i18n.load(locale, messages);
}
