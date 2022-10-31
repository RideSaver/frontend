import { jest, describe, expect, test, beforeEach } from "@jest/globals";
import type { Mocked } from "jest-mock";
import { configureStore } from "@reduxjs/toolkit";

import i18n, {
    downloadMessages,
    loadLocale as i18nLoadLocale,
} from "@ridesaver/internationalization";

const { slice, loadLocale, switchLocale } =
    require("..") as typeof import("..");

jest.useFakeTimers();

function setupStore() {
    return configureStore({
        reducer: {
            language: slice.reducer,
        },
    });
}

describe("switch language", () => {
    test("languages have different same test message", async () => {
        const store = setupStore();
        await store.dispatch((switchLocale as any)("en_US"));
        expect(i18n.activate).toHaveBeenLastCalledWith("en_US");
    });

    test("languages that were loaded should not be loaded again.", async () => {
        const store = setupStore();
        (i18nLoadLocale as any).mockClear(); // Verify that mock is cleared

        await store.dispatch(loadLocale("en_US"));
        await store.dispatch((switchLocale as any)("en_US"));

        /**
         * Expect that the locale was loaded
         */
        expect(i18nLoadLocale).toHaveBeenCalledTimes(1); // should only be called once for a preloaded locale

        await store.dispatch(loadLocale("en_UK"));
        await store.dispatch((switchLocale as any)("en_UK"));

        expect(i18nLoadLocale).toHaveBeenCalledTimes(2); // Should be called a second time for a different locale
    });

    test("languages that were not loaded should be loaded.", async () => {
        const store = setupStore();
        (i18nLoadLocale as any).mockClear(); // Verify that mock is cleared

        await store.dispatch((switchLocale as any)("en_US"));

        /**
         * Expect that the locale was loaded with the correct locale
         */
        expect(i18nLoadLocale).toHaveBeenCalledWith(
            "en_US",
            expect.anything(),
            expect.anything()
        );
    });

    test("last selected language should be activated.", async () => {
        const store = setupStore();
        (i18nLoadLocale as any).mockClear(); // Verify that mock is cleared

        (
            downloadMessages as Mocked<typeof downloadMessages>
        ).mockImplementationOnce(
            (locale) =>
                new Promise((resolve, reject) => {
                    setTimeout(
                        () =>
                            resolve({
                                locale,
                            }),
                        10000
                    );
                })
        );
        store.dispatch((switchLocale as any)("en_US"));
        await store.dispatch((switchLocale as any)("en_UK"));

        jest.runAllTimers();
        
        /**
         * Expect that the locale was loaded with the correct locale
         */
        expect(i18n.activate).toHaveBeenLastCalledWith("en_UK");
    });
});
