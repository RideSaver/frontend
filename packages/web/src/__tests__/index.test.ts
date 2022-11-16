import { describe, test } from "@jest/globals";
import "@testing-library/jest-dom";

import reportWebVitals from "../reportWebVitals";
import MainElement from "../App";
import reactDOM from "react-dom/client";

jest.mock("../App");
jest.mock("../reportWebVitals", () => ({
    default: jest.fn(),
}));

jest.mock("react-dom/client", () => {
    const orig =
        jest.requireActual<typeof import("react-dom/client")>(
            "react-dom/client"
        );
    return {
        __esmodule: true,
        ...orig,
        createRoot: jest.fn(orig.createRoot),
        hydrateRoot: jest.fn(orig.hydrateRoot),
    };
});

function setupRoot(innerHTML: string = "") {
    document.body.innerHTML = `<div id="root">${innerHTML}</div>`;
    // eslint-disable-next-line testing-library/no-node-access
    return document.getElementById("root");
}

describe("Themes", () => {
    test("Calls web vitals reporter", async () => {
        setupRoot();
        await import("..");
        expect(reportWebVitals).toHaveBeenCalled();
    });
    test("Renders app if there is no HTML", async () => {
        const root = setupRoot();
        await import("..");
        expect(reactDOM.createRoot).toHaveBeenCalledWith(MainElement, root);
        expect(reactDOM.hydrateRoot).not.toHaveBeenCalled();
        expect(root).toMatchSnapshot();
    });
    test("Hydrates app if there is HTML from SSR", async () => {
        const root = setupRoot("<Main />");
        await import("..");
        expect(reactDOM.createRoot).not.toHaveBeenCalled();
        expect(reactDOM.hydrateRoot).toHaveBeenCalledWith(MainElement, root);
    });
});
