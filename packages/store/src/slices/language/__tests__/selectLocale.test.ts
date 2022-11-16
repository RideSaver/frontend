/**
 * Tests redux state language/locale selection.
 * @author Elias Schablowski
 * @format
 */

import { describe, expect, test } from "@jest/globals";
import type { Mocked } from "jest-mock";
import { configureStore } from "@reduxjs/toolkit";
import type { RootState } from "../../../store";
import type { AnyAction, ReducersMapObject } from "@reduxjs/toolkit";

import { downloadMessages } from "@ridesaver/internationalization";

const { slice, switchLocale, getLocale } = jest.requireActual(
    ".."
) as typeof import("..");

function setupStore() {
    return configureStore<RootState>({
        reducer: {
            language: slice.reducer,
        } as ReducersMapObject<RootState, AnyAction>,
    });
}

describe("select language", () => {
    test("languages should be the same when selected", async () => {
        const store = setupStore();
        await store.dispatch(
            (switchLocale as Mocked<typeof switchLocale>)("en-US")
        );
        expect(getLocale(store.getState())).toBe("en-US");
    });
    test("language should not change until loaded", async () => {
        const store = setupStore();
        await store.dispatch(switchLocale("en-US"));
        (
            downloadMessages as Mocked<typeof downloadMessages>
        ).mockImplementationOnce(() => Promise.resolve({}));
        store.dispatch(switchLocale("en-UK"));
        expect(getLocale(store.getState())).toBe("en-US");
    });

    test("language should always change to the loaded language", async () => {
        const store = setupStore();
        await store.dispatch(switchLocale("en-US"));
        await store.dispatch(switchLocale("en-UK"));
        expect(getLocale(store.getState())).toBe("en-UK");
    });
});
