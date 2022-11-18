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

import PasswordInput from "..";

import i18n from "@ridesaver/internationalization";
import { I18nProvider } from "@lingui/react";

const TestingProvider = ({ children }) => (
    <I18nProvider i18n={i18n} defaultComponent={Text}>
        {children}
    </I18nProvider>
);

jest.mock("../PasswordStrengthIndicator", () => {
    const React = jest.requireActual("react");
    return ({ children, ...props }) =>
        React.createElement("PasswordStrengthIndicator", props, children);
});

describe.each([
    "Password",
    "fdsa",
    "4532",
    "Q%423$WH",
    "漢字43AV",
    "lłē36çˆ",
    "",
])("Password Input Selector", (password) => {
    test(`should correctly input ${password}`, () => {
        const changePassword = jest.fn();
        render(
            <PasswordInput onPasswordChange={changePassword} testID="input" />,
            { wrapper: TestingProvider }
        );

        fireEvent.changeText(screen.getByTestId("input"), password);
        expect(changePassword).toHaveBeenCalledWith(password);
    });
    test(`should toggle secureInput on visibility toggle for ${password}`, () => {
        const changePassword = jest.fn();
        render(
            <PasswordInput
                password={password}
                onPasswordChange={changePassword}
                testID="input"
            />,
            { wrapper: TestingProvider }
        );

        expect(screen.getByTestId("input")).toHaveProp("secureTextEntry", true);
        fireEvent.press(screen.getByTestId("password-visibility-toggle"));
        expect(screen.getByTestId("input")).toHaveProp(
            "secureTextEntry",
            false
        );
        fireEvent.press(screen.getByTestId("password-visibility-toggle"));
        expect(screen.getByTestId("input")).toHaveProp("secureTextEntry", true);
    });
    test(`should show password strength if requested`, () => {
        const changePassword = jest.fn();
        render(
            <PasswordInput
                password={password}
                onPasswordChange={changePassword}
                testID="input"
                showStrength
            />,
            { wrapper: TestingProvider }
        );

        expect(screen.getByTestId("password-strength")).toBeTruthy();
        expect(screen.getByTestId("password-strength")).toHaveProp(
            "password",
            password
        );

        render(
            <PasswordInput
                password={password}
                onPasswordChange={changePassword}
                testID="input"
            />,
            { wrapper: TestingProvider }
        );

        expect(() => screen.getByTestId("password-strength")).toThrow();
    });
});
