import store, { RootState, AppDispatch } from "./store";
import {
    useDispatch as reduxUseDispatch,
    useSelector as reduxUseSelector,
} from "react-redux";

export { default as store } from "./store";
export type { RootState, AppDispatch } from "./store";
export * as rideSettings from "./slices/rideSettingsSelector";
export * as language from "./slices/language";
export * as user from "./slices/user";

export const dispatch = store.dispatch;
export const select = store.dispatch;

export const useDispatch = reduxUseDispatch<AppDispatch>;
export const useSelector = reduxUseSelector<AppDispatch>;
