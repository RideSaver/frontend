import { createSlice } from "@reduxjs/toolkit";
import * as reducers from "./reducers";

import { Location } from "@RideSaver/api";

// Define a type for the slice state
interface SettingsState {
    seats: number;
    startPoint: Location;
    endPoint: Location;
}

// Define the initial state using that type
const initialState: SettingsState = {
    seats: 1,
    startPoint: {
        latitude: 0,
        longitude: 0,
    },
    endPoint: {
        latitude: 0,
        longitude: 0,
    },
};

const rideSettingsSlice = createSlice({
    name: "rideSettings",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers,
});

export default rideSettingsSlice;
