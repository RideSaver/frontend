/** @jest-environment node */

import { describe, test, jest, expect } from "@jest/globals";

import * as webVitals from "web-vitals";
jest.mock("web-vitals", async () => ({
    onCLS: jest.fn(),
    onFCP: jest.fn(),
    onFID: jest.fn(),
    onINP: jest.fn(),
    onLCP: jest.fn(),
    onTTFB: jest.fn(),
}));

// eslint-disable-next-line import/first
// import reportWebVitals from "../reportWebVitals";

describe("reportWebVitals", () => {
    test("Calls functions if it should report", async () => {
        const callback = () => {};
        jest.mock("web-vitals", async () => ({
            onCLS: jest.fn(),
            onFCP: jest.fn(),
            onFID: jest.fn(),
            onINP: jest.fn(),
            onLCP: jest.fn(),
            onTTFB: jest.fn(),
        }));
        console.log(await import("web-vitals"));
        (webVitals.onCLS as any).mockImplementationOnce(() => "Flabberdoodle");
        await require("../reportWebVitals").default(callback);
        expect(webVitals.onCLS).toHaveBeenCalledWith(callback);
        expect(webVitals.onFCP).toHaveBeenCalledWith(callback);
        expect(webVitals.onFID).toHaveBeenCalledWith(callback);
        expect(webVitals.onINP).toHaveBeenCalledWith(callback);
        expect(webVitals.onLCP).toHaveBeenCalledWith(callback);
        expect(webVitals.onTTFB).toHaveBeenCalledWith(callback);
    });
    test("Should not call functions without reporter", async () => {
        await require("../reportWebVitals").default();
        expect(webVitals.onCLS).not.toHaveBeenCalled();
        expect(webVitals.onFCP).not.toHaveBeenCalled();
        expect(webVitals.onFID).not.toHaveBeenCalled();
        expect(webVitals.onINP).not.toHaveBeenCalled();
        expect(webVitals.onLCP).not.toHaveBeenCalled();
        expect(webVitals.onTTFB).not.toHaveBeenCalled();
    });
});
