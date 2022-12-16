/**
 * Define redux async actions for user information.
 * @author Elias Schablowski
 * @format
 */

import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const load = createAsyncThunk(`user/load`, async () => {
    const userData = await AsyncStorage.getItem("@user");
    return JSON.parse(userData);
});
