/**
 * Mock for internationalization, tries to mimic the API (albeit with empty returns) used to verify that all functions are called correctly for internationalization.
 * @author Elias Schablowski
 * @format
 */

import { jest } from "@jest/globals";

module.exports = {
    __esModule: true,
    locales: ["en-US", "en-PS", "te-ST"],
    default: {
        activate: jest.fn(),
        load: jest.fn(),
        loadLocaleData: jest.fn(),
        _: jest.fn(),
    },
    downloadMessages: jest
        .fn<(locale: string) => Promise<{ messages: object }>>()
        .mockResolvedValue({
            messages: {
                locale: "testLocaleString",
            },
        }),
    loadLocale: jest.fn(),
};
