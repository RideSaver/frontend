import { describe, expect, test } from "@jest/globals";
import { configureStore } from "@reduxjs/toolkit";
import i18n, { locales } from "@ridesaver/internationalization";

import type { RootState } from "../../..";

// import { slice, loadLocale } from "..";
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
        expect(messages.messages).toMatchSnapshot("en_PS messages");
    });
    test("loads all possible locales correctly", async () => {
        const store = setupStore();
        expect.assertions(locales.length);
        await Promise.all(
            locales.map(async (locale) => {
                await store.dispatch(loadLocale(locale));
                const state = store.getState().language;
                expect(state.messages[locale]).toBeDefined();
                expect(() => i18n._("locale")).not.toThrow();
                expect(i18n.activate).toHaveBeenCalledWith(locale);
                expect(i18n.load).toHaveBeenCalledWith(
                    state.messages[locale].messages
                );
                expect(i18n.loadLocaleData).toHaveBeenCalledWith(
                    state.messages[locale].plurals
                );
            })
        );
    });
});
