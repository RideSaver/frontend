import { describe, test, expect } from "@jest/globals";
import * as theme from "../theme";

describe("Themes", () => {
    test("Has light theme", () => {
        expect(theme).toHaveProperty("light", expect.any(Object));
    });
    test("Has dark theme", () => {
        expect(theme).toHaveProperty("dark", expect.any(Object));
    });
});
