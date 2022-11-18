/**
 * Define redux state for user information.
 * @author Elias Schablowski
 * @format
 */

import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { load, login, signUp } from "./thunks";

// Define a type for the slice state
export interface UserState {
    avatar?: string;
    username?: string;
    token?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    isLoading: boolean;
}

const rideSettingsSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
    name: "user",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: {
        isLoading: false,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(load.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(load.fulfilled, (state, action) => {
                state.isLoading = false;
                Object.assign(state, action.payload);
            })
            .addCase(login.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
            })
            .addCase(signUp.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
            });
    },
});

export default rideSettingsSlice;
