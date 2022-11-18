import { describe, test } from "@jest/globals";
import "@testing-library/jest-dom";

import reportWebVitals from "../reportWebVitals";
import MainElement from "../App";
import reactDOM from "react-dom/client";

jest.mock("../App");
jest.mock("../reportWebVitals", () => (jest.fn()));
console.log(reportWebVitals);

const renderSpy = jest.spyOn(reactDOM, "createRoot");
const hydrateSpy = jest.spyOn(reactDOM, "hydrateRoot");

function setupRoot(innerHTML: string = "") {
    document.body.innerHTML = `<div id="root">${innerHTML}</div>`;
    // eslint-disable-next-line testing-library/no-node-access
    return document.getElementById("root");
}

describe("Web Entrypoint", () => {
    test("Calls web vitals reporter", async () => {
        setupRoot();
        await import("..");
        expect(reportWebVitals).toHaveBeenCalled();
    });
    test("Renders app if there is no HTML", async () => {
        const root = setupRoot();
        await import("..");
        expect(renderSpy).toHaveBeenCalledWith(MainElement, root);
        expect(hydrateSpy).not.toHaveBeenCalled();
        expect(root).toMatchSnapshot();
    });
    test("Hydrates app if there is HTML from SSR", async () => {
        const root = setupRoot("<Main />");
        await import("..");
        expect(renderSpy).not.toHaveBeenCalled();
        expect(hydrateSpy).toHaveBeenCalledWith(MainElement, root);
    });
});
