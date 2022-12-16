import { PayloadAction } from "@reduxjs/toolkit"
import type { StateType } from "./slice"

export function setToken(state: StateType, action: PayloadAction<string>) {
    state.token = action.payload;
    state.isLoading = false;
}