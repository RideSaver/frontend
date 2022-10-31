import { jest, describe, test, expect } from "@jest/globals";
import { I18n } from "@lingui/core";

import i18n, { locales, downloadMessages, loadLocale } from "..";

// jest.mock("@lingui/core");

describe("i18n", () => {
    test("should conform to I18n", () => {
        expect(i18n).toBeInstanceOf(I18n);
    });

    test("should always be the same", () => {
        expect(i18n).toBe(require("..").default);
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
            "en_US",
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
                default: "ar_winnie the poo",
            },
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
        const i18n = require("..").default as I18n;
        expect(i18n.locale).toBe("ar_winnie the poo");
        expect(i18n._messages).toMatchObject({
            "ar_winnie the poo": {
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
        const i18n = require("..").default as I18n;
        expect(i18n.locale).toBe("ar_winnie the poo");
        expect(i18n._messages).toMatchObject({
            "ar_winnie the poo": {
                locale: "Working",
                activity: "Eating honey",
            },
        });
    });

    test("Falls back to first locale if no source locale or default fallback is given", () => {
        jest.resetModules();
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
        const i18n = require("..").default as I18n;
        expect(i18n.locale).toBe("ar_winnie the poo");
        expect(i18n._messages).toMatchObject({
            "ar_winnie the poo": {
                locale: "Working",
                activity: "Eating honey",
            },
        });
    });
});
