/**
 * Reexport slice, thunks, and selectors for a more clean import in index.
 * @author Elias Schablowski
 * @format
 */

export { default as slice } from "./slice";

export * from "./thunks";

export * from "./selectors";

export const name = "language";
