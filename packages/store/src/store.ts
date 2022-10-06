import { configureStore } from "@reduxjs/toolkit";

import { slice as rideSettingsSlice } from "./slices/rideSettingsSelector";

const store = configureStore({
    reducer: {
        rideSettings: rideSettingsSlice.reducer,
    },
});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
