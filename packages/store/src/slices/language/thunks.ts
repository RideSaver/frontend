import { createAsyncThunk } from "@reduxjs/toolkit";
import { name } from ".";
import { locale, downloadMessages } from "@ridesaver/internationalization";
import { AppDispatch, RootState } from "../../store";

export const loadLocale = createAsyncThunk(
    `${name}/load`,
    async (localeId: locale, thunkAPI) => {
        const response = await downloadMessages(localeId);
        return response;
    }
);

export const switchLocale = createAsyncThunk<
    locale,
    locale,
    {
        dispatch: AppDispatch;
        state: RootState;
    }
>(`${name}/switch`, async (localeId, thunkAPI) => {
    if (thunkAPI.getState().language.messages[localeId] === undefined) {
        await thunkAPI.dispatch(loadLocale(localeId));
    }
    return localeId;
});
