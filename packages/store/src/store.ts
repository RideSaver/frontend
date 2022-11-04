import { configureStore } from "@reduxjs/toolkit";

import { slice as rideSettingsSlice } from "./slices/rideSettingsSelector";
import { slice as languageSlice } from "./slices/language";
import { slice as userSlice } from "./slices/user";

const store = configureStore({
    reducer: {
        rideSettings: rideSettingsSlice.reducer,
        language: languageSlice.reducer,
        user: userSlice.reducer,
    },
});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
