import { describe, expect, test } from "@jest/globals";
import { configureStore } from "@reduxjs/toolkit";
import { Platform } from "react-native";
import i18n from "@ridesaver/internationalization";

import { loadLocale, slice, switchLocale } from "..";

function setupStore() {
    return configureStore({
        reducer: {
            language: slice.reducer,
        },
    });
}

describe("switch language", () => {
    test("languages have different same test message", async () => {
        // Platform.OS = "web";
        global.navigator = {} as any;
        (navigator as any).languages = ["en_PS"];
        const store = setupStore();
        const messages = i18n._("locale");
        await store.dispatch((switchLocale as any)("en_US"));
        expect(i18n._("locale")).not.toBe(messages);
    });

    test("languages that were loaded should not be loaded again.", async () => {
        // Platform.OS = "web";
        global.navigator = {} as any;
        (navigator as any).languages = ["en_PS"];
        const store = setupStore();
        await store.dispatch(loadLocale("en_US"));
        await store.dispatch((switchLocale as any)("en_US"));
        expect(i18n.load).toHaveBeenCalledWith("en_US");
        expect(i18n.load).toHaveBeenCalledTimes(2);
    });
});
