/**
 * Reexports store, selectors and actions for easy access, also correctly types useDispatch and useSelector for tighter typescript integration.
 * @author Elias Schablowski
 * @format
 */

import store, { RootState, AppDispatch } from "./store";
import {
    useDispatch as reduxUseDispatch,
    useSelector as reduxUseSelector,
} from "react-redux";

export { default as store } from "./store";
export type { RootState, AppDispatch } from "./store";
export * as language from "./slices/language";
export * as user from "./slices/user";

export const dispatch = store.dispatch;
export const getState = store.getState;

export const useDispatch = reduxUseDispatch<AppDispatch>;
export const useSelector = reduxUseSelector<RootState>;
