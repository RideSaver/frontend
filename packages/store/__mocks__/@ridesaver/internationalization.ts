import { jest } from "@jest/globals";

type expT = typeof import("@ridesaver/internationalization");

let original: expT = jest.requireActual("@ridesaver/internationalization");
jest.mock<expT>("@ridesaver/internationalization", () => {
    let i18n = original.default;
    let mockedI18n = {};
    Object.keys(i18n).forEach((prop) => {
        if (typeof i18n[prop] === "function") {
            mockedI18n[prop] = jest.fn((...args) => {
                i18n[prop](...args);
            });
        } else {
            mockedI18n[prop] = i18n[prop];
        }
    });
    return {
        __esModule: true,
        ...original,
        default: mockedI18n as any,
        downloadMessages: jest.fn((locale) => {
            return Promise.resolve({
                plurals: (a: any) => `${a}`,
                messages: {
                    locale,
                },
            });
        }),
    };
});
