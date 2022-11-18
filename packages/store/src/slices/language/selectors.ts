/**
 * Create selectors for all language state attributes.
 * @author Elias Schablowski
 * @format
 */

import { RootState } from "../../store";

export const getLocale = (state: RootState) => state.language.locale;
