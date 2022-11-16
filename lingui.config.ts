/**
 * The Main lingui.js config. @see lingui.js.org
 * @author Elias Schablowski
 * @format
 */

import { LinguiConfig } from "@lingui/conf";

export const locales = ["en-US", "en-UK", "en-PS"] as const;

export type locale = typeof locales extends readonly (infer ElementType)[]
    ? ElementType
    : never;
export default {
    catalogs: [
        {
            path: "<rootDir>/packages/internationalization/locale/{locale}/messages",
            include: ["<rootDir>"],
            exclude: ["**/node_modules/**"],
        },
    ],
    locales: [].concat(locales),
    format: "po",
    compileNamespace: "ts",
    orderBy: "origin",
    sourceLocale: "en-US",
    pseudoLocale: "en-PS",
    fallbackLocales: {
        default: "en-US",
        "en-PS": "en-US",
        "en-UK": "en-US",
    },
} as Partial<LinguiConfig>;
