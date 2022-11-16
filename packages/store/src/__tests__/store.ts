/** @format */

import store from "../store";

describe("Redux store", () => {
    test("Is a redux store", () => {
        expect(store).toHaveProperty("getState");
        expect(store).toHaveProperty("dispatch");
        expect(store).toHaveProperty("subscribe");
        expect(store).toHaveProperty("replaceReducer");
    });
});
