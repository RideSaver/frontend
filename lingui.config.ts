import { LinguiConfig } from "@lingui/conf";

export const locales = ["en_US", "en_UK", "en_PS"] as const;

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
    locales: locales as any,
    format: "po",
    compileNamespace: "ts",
    orderBy: "origin",
    sourceLocale: "en_US",
    pseudoLocale: "en_PS",
    fallbackLocales: {
        default: "en_US",
        en_PS: "en_US",
        en_UK: "en_US",
    },
} as Partial<LinguiConfig>;
