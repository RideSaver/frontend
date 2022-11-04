import { createAsyncThunk } from "@reduxjs/toolkit";
import { locale, downloadMessages } from "@ridesaver/internationalization";
import { RootState } from "../../store";

export const loadLocale = createAsyncThunk(
    `language/load`,
    async (localeId: locale, thunkAPI) => {
        const response = await downloadMessages(localeId);
        return response;
    }
);

export const switchLocale = createAsyncThunk<
    locale,
    locale,
    {
        dispatch: any;
        state: RootState;
    }
>(`language/switch`, async (localeId, thunkAPI) => {
    const state = thunkAPI.getState().language;
    if (
        state.messages[localeId] === undefined &&
        !state.loadingLocales.includes(localeId)
    ) {
        await thunkAPI.dispatch(loadLocale(localeId));
    }
    return localeId;
});
