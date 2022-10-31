import { jest, describe, expect, test, beforeEach } from "@jest/globals";
import type { Mocked } from "jest-mock";
import { configureStore } from "@reduxjs/toolkit";

import i18n, {
    downloadMessages,
    loadLocale as i18nLoadLocale,
} from "@ridesaver/internationalization";

const { slice, loadLocale, switchLocale, getLocale } =
    require("..") as typeof import("..");

function setupStore() {
    return configureStore({
        reducer: {
            language: slice.reducer,
        },
    });
}

describe("select language", () => {
    test("languages should be the same when selected", async () => {
        const store = setupStore();
        await store.dispatch((switchLocale as any)("en_US"));
        expect(getLocale(store.getState() as any)).toBe("en_US");
    });
    test("language should not change until loaded", async () => {
        const store = setupStore();
        await store.dispatch((switchLocale as any)("en_US"));
        (
            downloadMessages as Mocked<typeof downloadMessages>
        ).mockImplementationOnce(() => new Promise(() => {}));
        store.dispatch((switchLocale as any)("en_UK"));
        expect(getLocale(store.getState() as any)).toBe("en_US");
    });

    test("language should always change to the loaded language", async () => {
        const store = setupStore();
        await store.dispatch((switchLocale as any)("en_US"));
        await store.dispatch((switchLocale as any)("en_UK"));
        expect(getLocale(store.getState() as any)).toBe("en_UK");
    });
});
