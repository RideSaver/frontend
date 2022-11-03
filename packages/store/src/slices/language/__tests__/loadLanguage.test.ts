import { jest, describe, expect, test } from "@jest/globals";
import { configureStore } from "@reduxjs/toolkit";
import i18n, { locales, loadLocale as i18nLoadLocale } from "@ridesaver/internationalization";

const { slice, loadLocale } = require("..") as typeof import("..");

function setupStore() {
    return configureStore({
        reducer: {
            language: slice.reducer,
        },
    });
}

describe("loads language", () => {
    test("load en_PS ", async () => {
        expect.assertions(1);
        const store = setupStore();
        const messages = await store.dispatch(loadLocale("en_PS")).unwrap();
        expect(messages).toMatchSnapshot("en_PS messages");
    });
    test("loads all possible locales correctly", async () => {
        const store = setupStore();

        expect.assertions(3 * locales.length);
        for (const locale of locales) {
            await store.dispatch(loadLocale(locale as any)).unwrap();
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