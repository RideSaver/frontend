import slice from "./slice";

export { default as slice } from "./slice";

export * from "./selectors";

export const { setSeats, setStartPoint, setEndPoint } = slice.actions;
