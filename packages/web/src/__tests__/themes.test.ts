import { describe, test } from "@jest/globals";
import * as themes from "../themes";

describe("Themes", () => {
    test("Has light theme", () => {
        expect(themes).toHaveProperty("light", expect.any(Object));
    });
    test("Has dark theme", () => {
        expect(themes).toHaveProperty("dark", expect.any(Object));
    });
});
