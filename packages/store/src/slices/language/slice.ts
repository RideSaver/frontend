import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { loadLocale, switchLocale } from "./thunks";
import i18n, {
    locale,
    loadLocale as i18nLoad,
} from "@ridesaver/internationalization";

// Define a type for the slice state
interface LanguageState {
    locale?: locale;
    pendingLocale?: locale;
    loadingLocales: locale[];
    messages: {
        [id in locale]?: any;
    };
}

const rideSettingsSlice = createSlice<
    LanguageState,
    SliceCaseReducers<LanguageState>
>({
    name: "language",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: {
        locale: i18n?.locale as any,
        messages: i18n?._messages || {},
        loadingLocales: []
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(loadLocale.pending, (state, action) => {
                state.loadingLocales.push(action.meta.arg);
            })
            .addCase(loadLocale.fulfilled, (state, action) => {
                state.messages[action.meta.arg] = action.payload;
                state.loadingLocales = state.loadingLocales.filter(locale => locale !== action.meta.arg);
                i18nLoad(
                    action.meta.arg,
                    state.messages[action.meta.arg],
                    i18n
                );
            })
            .addCase(switchLocale.fulfilled, (state, action) => {
                if (action.meta.arg !== state.pendingLocale) return; // Cancel change if we have a different pending locale
                state.locale = action.meta.arg;
                i18n.activate(state.locale);
            })
            .addCase(switchLocale.pending, (state, action) => {
                state.pendingLocale = action.meta.arg;
            });
    },
});

export default rideSettingsSlice;
