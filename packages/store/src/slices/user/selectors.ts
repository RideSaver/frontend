/**
 * Defines selectors for important user information.
 * @TODO
 * @author Elias Schablowski
 * @format
 */

import { RootState } from "../../store";

export const getEmail = (state: RootState) => state.auth.email;
export const getName = (state: RootState) => state.auth.name;
export const getPhone = (state: RootState) => state.auth.phonenumber;
export const getUsername = (state: RootState) => state.auth.username;
export const getAvatar = (state: RootState) => state.auth.avatar;
export const getToken = (state: RootState) => state.auth.token;
export const getIsLoading = (state: RootState) => !!state.auth.isLoading;
