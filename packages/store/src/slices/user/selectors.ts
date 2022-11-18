/**
 * Defines selectors for important user information.
 * @TODO
 * @author Elias Schablowski
 * @format
 */

import { RootState } from "../../store";

export const getEmail = (state: RootState) => state.user.email;
export const getName = (state: RootState) => state.user.name;
export const getPhone = (state: RootState) => state.user.phoneNumber;
export const getUsername = (state: RootState) => state.user.username;
export const getAvatar = (state: RootState) => state.user.avatar;
export const getToken = (state: RootState) => state.user.token;
