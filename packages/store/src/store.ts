/**
 * Create the Redux store, as well as extract typings from the store.
 * @author Elias Schablowski
 * @format
 */

import { configureStore } from "@reduxjs/toolkit";

import { slice as languageSlice } from "./slices/language";
import { slice as userSlice } from "./slices/user";
import { setupListeners } from '@reduxjs/toolkit/query'

import { ridesaverAPI } from "@RideSaver/api/redux";

const store = configureStore({
    reducer: {
        language: languageSlice.reducer,
        user: userSlice.reducer,
        [ridesaverAPI.reducerPath]: ridesaverAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ridesaverAPI.middleware),
});
setupListeners(store.dispatch);

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
