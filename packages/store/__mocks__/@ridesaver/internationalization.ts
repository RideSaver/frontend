import { jest } from "@jest/globals";
import { setupI18n } from "@lingui/core";

type expT = typeof import("@ridesaver/internationalization");

const originalModule = jest.requireActual<
    typeof import("@ridesaver/internationalization")
>("@ridesaver/internationalization");

let mock = {
    __esModule: true,
    ...originalModule,
    default: {
        activate: jest.fn(),
        load: jest.fn(),
        loadLocaleData: jest.fn(),
        _: jest.fn(),
    },
    downloadMessages: jest.fn(originalModule.downloadMessages),
    loadLocale: jest.fn(),
};

jest.mock<typeof import("@ridesaver/internationalization")>(
    "@ridesaver/internationalization",
    () => mock as any
);

export const { downloadMessages, loadLocale, locales } = mock;

export default mock.default;
