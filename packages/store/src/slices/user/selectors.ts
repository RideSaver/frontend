import { RootState } from "../../store";

export const getLocale = (state: RootState) => state.language.locale;
