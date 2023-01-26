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
    latitude: number;
    longitude: number;
}

const destinationSlice = createSlice<StateType, SliceCaseReducers<StateType>>({
    name: "destination",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: {
        latitude: 0,
        longitude: 0
    },
    reducers,
});

export default destinationSlice;
