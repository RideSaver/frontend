import { createAction } from "@reduxjs/toolkit";
import { name } from ".";
import { i18n } from "@lingui/core";

export const seti18n = createAction<typeof i18n>(`${name}/seti18n`);
