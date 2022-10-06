import store from "./store";

export { default as store, RootState, AppDispatch } from "./store";
export * as rideSettings from "./slices/rideSettingsSelector";

export const dispatch = store.dispatch;
export const select = store.dispatch;