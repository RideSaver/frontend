/**
 * Tests language switching of redux state.
 * @author Elias Schablowski
 * @format
 */

import { jest, describe, expect, test } from "@jest/globals";
import type { Mocked } from "jest-mock";
import { configureStore } from "@reduxjs/toolkit";

import i18n, {
    downloadMessages,
    loadLocale as i18nLoadLocale,
} from "@RideSaver/internationalization";

const { slice, loadLocale, switchLocale } = jest.requireActual(
    ".."
) as typeof import("..");

// jest.useFakeTimers();

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
        await store.dispatch(switchLocale("en-US")).unwrap();
        expect(i18n.activate).toHaveBeenLastCalledWith("en-US");
    });

    test("languages that were loaded should not be loaded again.", async () => {
        const store = setupStore();
        (i18nLoadLocale as Mocked<typeof i18nLoadLocale>).mockClear(); // Verify that mock is cleared

        await store.dispatch(loadLocale("en-US"));
        await store.dispatch(switchLocale("en-US"));

        /**
         * Expect that the locale was loaded
         */
        expect(i18nLoadLocale).toHaveBeenCalledTimes(1); // should only be called once for a preloaded locale

        await store.dispatch(loadLocale("en-UK"));
        await store.dispatch(switchLocale("en-UK"));

        expect(i18nLoadLocale).toHaveBeenCalledTimes(2); // Should be called a second time for a different locale
    });

    test("languages that were not loaded should be loaded.", async () => {
        const store = setupStore();
        (i18nLoadLocale as Mocked<typeof i18nLoadLocale>).mockClear(); // Verify that mock is cleared

        await store.dispatch(switchLocale("en-US"));

        /**
         * Expect that the locale was loaded with the correct locale
         */
        expect(i18nLoadLocale).toHaveBeenCalledWith(
            "en-US",
            expect.anything(),
            expect.anything()
        );
    });

    test("last selected language should be activated.", async () => {
        const store = setupStore();
        (i18nLoadLocale as Mocked<typeof i18nLoadLocale>).mockClear(); // Verify that mock is cleared

        (
            downloadMessages as Mocked<typeof downloadMessages>
        ).mockImplementationOnce(
            (locale) =>
                new Promise((resolve) => {
                    setTimeout(
                        () =>
                            resolve({
                                locale,
                            }),
                        10
                    );
                })
        );
        const switch1 = store.dispatch(switchLocale("en-US")).unwrap();
        await store.dispatch(switchLocale("en-UK"));

        await switch1;

        /**
         * Expect that the locale was loaded with the correct locale
         */
        expect(i18n.activate).toHaveBeenLastCalledWith("en-UK");
    });
});
