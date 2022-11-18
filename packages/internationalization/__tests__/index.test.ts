/**
 * Testing for all utility functions for localization.
 * @author Elias Schablowski
 * @format
 */

import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import { I18n } from "@lingui/core";

import i18n, { locales, downloadMessages, loadLocale } from "..";

beforeEach(() => {
    jest.resetModules();
});

describe("i18n", () => {
    test("should conform to I18n", () => {
        expect(i18n).toBeInstanceOf(I18n);
    });
});

describe("locales", () => {
    test("locales should not change (without reason)", () => {
        expect(locales).toMatchSnapshot();
    });
});

describe("downloadMessages", () => {
    test("should handle all locales", () => {
        expect.assertions(2 * locales.length);
        for (const locale of locales) {
            expect(() => downloadMessages(locale)).not.toThrow();
            expect(downloadMessages(locale)).resolves.toBeInstanceOf(Object);
        }
    });
});

describe("loadLocale", () => {
    test("should load the given locale", () => {
        const loadSpy = jest.spyOn(i18n, "load");
        const loadLocaleDataSpy = jest.spyOn(i18n, "loadLocaleData");

        loadLocale(
            "en-US",
            {
                locale: "en_US",
            },
            i18n
        );

        expect(loadSpy).toHaveBeenCalled();
        expect(loadLocaleDataSpy).toHaveBeenCalled();
    });
});

describe("defaults", () => {
    test("Uses default fallback locale to initialize", () => {
        jest.resetModules();
        jest.mock("../../../lingui.config.ts", () => ({
            fallbackLocales: {
                default: "ar-winnie the poo",
            },
            locales: ["ar-winnie the poo"],
        }));
        jest.mock(
            "../locale/ar-winnie the poo/messages.ts",
            () => {
                return {
                    locale: "Working",
                    activity: "Eating honey",
                };
            },
            { virtual: true }
        );
        const { default: i18n } = jest.requireActual<typeof import("..")>("..");
        expect(i18n.locale).toBe("ar-winnie the poo");
        expect(i18n._messages).toMatchObject({
            "ar-winnie the poo": {
                locale: "Working",
                activity: "Eating honey",
            },
        });
    });

    test("Falls back to source locale if no default fallback is given", () => {
        jest.resetModules();
        jest.mock("../../../lingui.config.ts", () => ({
            sourceLocale: "ar_winnie the poo",
            locales: ["ar_winnie the poo"],
        }));
        jest.mock(
            "../locale/ar_winnie the poo/messages.ts",
            () => {
                return {
                    locale: "Working",
                    activity: "Eating honey",
                };
            },
            { virtual: true }
        );
        const { default: i18n } = jest.requireActual<typeof import("..")>("..");
        expect(i18n.locale).toBe("ar_winnie the poo");
        expect(i18n._messages).toMatchObject({
            "ar_winnie the poo": {
                locale: "Working",
                activity: "Eating honey",
            },
        });
    });

    test("Falls back to first locale if no source locale or default fallback is given", () => {
        jest.mock("../../../lingui.config.ts", () => ({
            locales: ["ar_winnie the poo"],
        }));
        jest.mock(
            "../locale/ar_winnie the poo/messages.ts",
            () => {
                return {
                    locale: "Working",
                    activity: "Eating honey",
                };
            },
            { virtual: true }
        );
        const { default: i18n } = jest.requireActual<typeof import("..")>("..");
        expect(i18n.locale).toBe("ar_winnie the poo");
        expect(i18n._messages).toMatchObject({
            "ar_winnie the poo": {
                locale: "Working",
                activity: "Eating honey",
            },
        });
    });
});
