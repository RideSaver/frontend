import { PayloadAction } from "@reduxjs/toolkit"
import type { StateType } from "./slice"

export function setDestination(state: StateType, action: PayloadAction<{
    latitude: number;
    longitude: number;
}>) {
    state = action.payload;
}
