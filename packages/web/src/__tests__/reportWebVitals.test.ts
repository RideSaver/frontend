import { describe, test } from "@jest/globals";

import * as webVitals from "web-vitals";

// import reportWebVitals from "../reportWebVitals";

jest.mock("web-vitals");
jest.unmock("../reportWebVitals");

const reportWebVitals = (
    require("../reportWebVitals") as typeof import("../reportWebVitals")
).default;

describe("Themes", () => {
    test("Calls functions if it should report", async () => {
        const callback = () => {};
        console.log(reportWebVitals);
        await reportWebVitals(callback);
        expect(webVitals.onCLS).toHaveBeenCalledWith(callback);
        expect(webVitals.onFCP).toHaveBeenCalledWith(callback);
        expect(webVitals.onFID).toHaveBeenCalledWith(callback);
        expect(webVitals.onINP).toHaveBeenCalledWith(callback);
        expect(webVitals.onLCP).toHaveBeenCalledWith(callback);
        expect(webVitals.onTTFB).toHaveBeenCalledWith(callback);
    });
    test("Should not call functions without reporter", async () => {
        await reportWebVitals();
        expect(webVitals.onCLS).not.toHaveBeenCalled();
        expect(webVitals.onFCP).not.toHaveBeenCalled();
        expect(webVitals.onFID).not.toHaveBeenCalled();
        expect(webVitals.onINP).not.toHaveBeenCalled();
        expect(webVitals.onLCP).not.toHaveBeenCalled();
        expect(webVitals.onTTFB).not.toHaveBeenCalled();
    });
});
