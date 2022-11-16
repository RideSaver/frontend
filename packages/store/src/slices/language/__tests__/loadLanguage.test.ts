/**
 * Tests language loading handlers of redux state.
 * @author Elias Schablowski
 * @format
 */

import { jest, describe, expect, test } from "@jest/globals";
import type { Mocked } from "jest-mock";
import { configureStore } from "@reduxjs/toolkit";
import i18n, {
    locales,
    loadLocale as i18nLoadLocale,
    downloadMessages,
} from "@ridesaver/internationalization";

const { slice, loadLocale } = jest.requireActual("..") as typeof import("..");

function setupStore() {
    return configureStore({
        reducer: {
            language: slice.reducer,
        },
    });
}

describe("loads language", () => {
    test("load en_PS ", async () => {
        // Some dummy messages that should NEVER be in the real application
        const msgs = {
            cagfd: "ajfklds",
            cagfds: "ajfklfdsads",
        };
        (
            downloadMessages as Mocked<typeof downloadMessages>
        ).mockImplementationOnce((locale) =>
            Promise.resolve(locale === "en-PS" ? msgs : {})
        );
        expect.assertions(1);
        const store = setupStore();
        const messages = await store.dispatch(loadLocale("en-PS")).unwrap();
        expect(messages).toBe(msgs);
    });
    test("loads all possible locales correctly", async () => {
        const store = setupStore();

        expect.assertions(3 * locales.length);
        for (const locale of locales) {
            await store.dispatch(loadLocale(locale)).unwrap();
            const state = store.getState().language;

            expect(state.messages[locale]).toBeDefined();
            expect(i18n.activate).not.toHaveBeenCalledWith(locale);
            expect(i18nLoadLocale).toHaveBeenCalledWith(
                locale,
                state.messages[locale],
                i18n
            );
        }
    });
});
