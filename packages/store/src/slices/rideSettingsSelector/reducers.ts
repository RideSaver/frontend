import type { PayloadAction } from "@reduxjs/toolkit";

export const setSeats = (state, action: PayloadAction<number>) => {
    state.seats = action.payload;
};
export const setStartPoint = (state, action: PayloadAction<Location>) => {
    state.startPoint = action.payload;
};
export const setEndPoint = (state, action: PayloadAction<Location>) => {
    state.endPoint = action.payload;
};
