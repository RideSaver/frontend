import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import getLocale from "./locale_detector";
import { loadLocale, switchLocale } from "./thunks";
import i18n, {
    locale,
    locales,
    loadLocale as i18nLoad,
} from "@ridesaver/internationalization";

// Define a type for the slice state
interface LanguageState {
    locale?: locale;
    pendingLocale?: locale;
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
        locale: i18n.locale as any,
        messages: i18n._messages,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(loadLocale.fulfilled, (state, action) => {
                console.log(i18n);
                state.messages[action.payload.locale] = action.payload.messages;
                i18nLoad(
                    action.meta.arg,
                    state.messages[action.payload.locale]
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
