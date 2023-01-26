/**
 * Define redux state for user information.
 * @author Elias Schablowski
 * @format
 */

import { createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { load } from "./thunks";
import {User} from "@RideSaver/api/redux";
import * as reducers from "./reducers";

export interface StateType extends Partial<User> {
    token?: string;
    isLoading: boolean;
    username?: string;
    avatar?: string;
}

const userSlice = createSlice<StateType, SliceCaseReducers<StateType>>({
    name: "auth",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: {
        isLoading: false
    },
    reducers,
    extraReducers(builder) {
        builder
            .addCase(load.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(load.fulfilled, (state, action: PayloadAction<string>) => {
                if (state.isLoading) {
                    state.isLoading = false;
                    state.token = action.payload;
                }
            })
    }
});

export default userSlice;
