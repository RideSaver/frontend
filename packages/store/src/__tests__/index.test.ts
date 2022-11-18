/** @format */

import * as store from "..";
import { useDispatch, useSelector } from "react-redux";
import intStore from "../store";

describe("Redux store", () => {
    test("Reexports redux hooks unchanged (just adds typing)", () => {
        expect(store.useDispatch).toBe(useDispatch);
        expect(store.useSelector).toBe(useSelector);
    });
    test("Exports dispatch and select from store", () => {
        expect(store.dispatch).toBe(intStore.dispatch);
        expect(store.getState).toBe(intStore.getState);
    });
});
