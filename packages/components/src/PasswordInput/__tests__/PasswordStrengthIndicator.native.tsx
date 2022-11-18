/**
 * Tests for localization of location selection.
 * @author Elias Schablowski
 * @format
 */

import React from "react";
import { Text } from "react-native";
import { describe, test } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";

import StrengthIndicator from "../PasswordStrengthIndicator";
import { zxcvbn } from "@zxcvbn-ts/core";

import i18n from "@ridesaver/internationalization";
import { I18nProvider } from "@lingui/react";

const TestingProvider = ({ children }) => (
    <I18nProvider i18n={i18n} defaultComponent={Text}>
        {children}
    </I18nProvider>
);

describe("Password Input Selector", () => {
    test.each([
        { password: "Password", score: 0, time: 10 },
        { password: "fdsa", score: 0, time: 20 },
        { password: "4532", score: 0, time: 10 },
        { password: "Q%423$WH", score: 2, time: 86 },
        { password: "漢字43AV", score: 1, time: 3600 * 50 },
        { password: "lłē36çˆ", score: 2, time: 99 },
        { password: "o33m1^fPg", score: 3, time: 3600 },
        { password: "zihPixCinBT#T7Sm#JVY23e&g01e", score: 4, time: 10 ** 20 },
        { password: "zihPixCinB", score: 3, time: 10 ** 20 },
    ])("should correctly display $password", ({ password, score, time }) => {
        (zxcvbn as ReturnType<typeof jest.fn>).mockImplementation(() => ({
            score,
            crackTimesSeconds: {
                offlineSlowHashing1e4PerSecond: time,
            },
        }));

        render(<StrengthIndicator password={password} />, {
            wrapper: TestingProvider,
        });

        expect(screen.getByTestId("password-score-bar")).toHaveProp(
            "progress",
            score / 4
        );
        expect(zxcvbn).toHaveBeenCalledWith(password);
    });
    test("Should display text for information for passwords", () => {
        render(<StrengthIndicator password="TestingPassword" />, {
            wrapper: TestingProvider,
        });

        expect(
            screen.getByTestId("password-strength-text")
        ).not.toBeEmptyElement();
    });
    test("Should not display text for an empty password", () => {
        render(<StrengthIndicator password="" />, { wrapper: TestingProvider });

        expect(screen.getByTestId("password-strength-text")).toBeEmptyElement();
    });
    test("Should cycle between cracking methods when pressed", () => {
        class CrackTimesSecondsSpyer {
            constructor(tries: number) {
                this.tries = tries;
            }
            tries: number;
            get offlineFastHashing1e10PerSecond(): number {
                return this.tries / 10 ** 10;
            }
            get offlineSlowHashing1e4PerSecond(): number {
                return this.tries / 10 ** 4;
            }
            get onlineNoThrottling10PerSecond(): number {
                return this.tries / 10 ** 10;
            }
            get onlineThrottling100PerHour(): number {
                return (this.tries / 100) * 60;
            }
        }
        const a = {
            score: 1,
            crackTimesSeconds: new CrackTimesSecondsSpyer(10000000000),
        };

        const offlineFastSpy = jest.spyOn(
            a.crackTimesSeconds,
            "offlineFastHashing1e10PerSecond",
            "get"
        );
        const offlineSlowSpy = jest.spyOn(
            a.crackTimesSeconds,
            "offlineSlowHashing1e4PerSecond",
            "get"
        );
        const onlineFastSpy = jest.spyOn(
            a.crackTimesSeconds,
            "onlineNoThrottling10PerSecond",
            "get"
        );
        const onlineSlowSpy = jest.spyOn(
            a.crackTimesSeconds,
            "onlineThrottling100PerHour",
            "get"
        );
        (zxcvbn as ReturnType<typeof jest.fn>).mockImplementation(() => a);

        render(<StrengthIndicator password="TestingPassword" />, {
            wrapper: TestingProvider,
        });
        for (let i = 0; i < 4; i++) {
            const message = screen.getByTestId("password-strength-text");
            expect(message).not.toBeEmptyElement();
            fireEvent.press(message);
        }

        expect(onlineSlowSpy).toHaveBeenCalled();
        expect(onlineFastSpy).toHaveBeenCalled();
        expect(offlineSlowSpy).toHaveBeenCalled();
        expect(offlineFastSpy).toHaveBeenCalled();
    });
});
