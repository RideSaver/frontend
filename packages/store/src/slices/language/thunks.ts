import { createAsyncThunk } from "@reduxjs/toolkit";
import { locale, downloadMessages } from "@ridesaver/internationalization";
import { AppDispatch, RootState } from "../../store";
import * as intl from "@ridesaver/internationalization";

export const loadLocale = createAsyncThunk(
    `language/load`,
    async (localeId: locale, thunkAPI) => {
        const response = await intl.downloadMessages(localeId);
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
>(`language/switch`, async (localeId, thunkAPI) => {
    const state = thunkAPI.getState().language;
    if (state.messages[localeId] === undefined && !state.loadingLocales.includes(localeId)) {
        await thunkAPI.dispatch(loadLocale(localeId));
    }
    return localeId;
});
