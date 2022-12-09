/**
 * Define thunks for language actions.
 * @author Elias Schablowski
 * @format
 */

import { createAsyncThunk, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { locale, downloadMessages } from "@RideSaver/internationalization";
import { RootState } from "../../store";

export const loadLocale = createAsyncThunk(
    `language/load`,
    async (localeId: locale) => {
        return downloadMessages(localeId);
    }
);

export const switchLocale = createAsyncThunk<
    locale,
    locale,
    {
        dispatch: ThunkDispatch<RootState, undefined, AnyAction>;
        state: RootState;
    }
>(`language/switch`, async (localeId, thunkAPI) => {
    const state = thunkAPI.getState().language;
    if (
        state.messages[localeId] === undefined &&
        !state.loadingLocales.includes(localeId)
    ) {
        await thunkAPI.dispatch(loadLocale(localeId)).unwrap();
    }
    return localeId;
});
