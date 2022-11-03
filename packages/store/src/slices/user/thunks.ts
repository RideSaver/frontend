import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService, User } from "@RideSaver/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const load = createAsyncThunk(`user/load`, async () => {
    const userData = await AsyncStorage.getItem("@user");
    return JSON.parse(userData);
});

export const login = createAsyncThunk(
    `user/login`,
    async (user: { username: string; password: string }) => {
        const userInfo = await UserService.login(user);
        return userInfo;
    }
);

export const signUp = createAsyncThunk(`user/signUp`, (user: User) => {
    const userInfo = UserService.signUp(user);
    return userInfo;
});
