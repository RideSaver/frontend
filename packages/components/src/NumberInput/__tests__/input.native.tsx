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

import NumberInput from "..";

import i18n from "@ridesaver/internationalization";
import { I18nProvider } from "@lingui/react";

const TestingProvider = ({ children }) => (
    <I18nProvider i18n={i18n} defaultComponent={Text}>
        {children}
    </I18nProvider>
);

describe("Number Input", () => {
    test.each([12, 13, 85, 2, 1])("should correctly input %i", (num) => {
        const value = 0;
        const changeValue = jest.fn();
        render(
            <NumberInput
                value={value}
                onChangeValue={changeValue}
                testID="input"
            />,
            { wrapper: TestingProvider }
        );

        fireEvent.changeText(screen.getByTestId("input"), `${num}`);
        expect(changeValue).toHaveBeenCalledWith(num);
    });
    test.each([
        [12, 13],
        [64, 65],
        [0, 1],
    ])("should correctly increment for %i", (inp, out) => {
        const changeValue = jest.fn();
        render(
            <NumberInput
                value={inp}
                onChangeValue={changeValue}
                testID="input"
            />,
            { wrapper: TestingProvider }
        );

        fireEvent.press(screen.getByTestId("increment-button"));
        expect(changeValue).toHaveBeenCalledWith(out);
    });
    test.each([
        [13, 12],
        [65, 64],
        [1, 0],
    ])("should correctly decrement for %i", (inp, out) => {
        const changeValue = jest.fn();
        render(
            <NumberInput
                value={inp}
                onChangeValue={changeValue}
                testID="input"
            />,
            { wrapper: TestingProvider }
        );

        fireEvent.press(screen.getByTestId("decrement-button"));
        expect(changeValue).toHaveBeenCalledWith(out);
    });
    test.each([
        [12.3, 12],
        [542.34, 542],
        ["Here I Am 4 you", 4],
    ])(
        "should read integer only numbers and ignore any extrainious letters in %f",
        (input, expected) => {
            const changeValue = jest.fn();
            render(
                <NumberInput
                    value={0}
                    onChangeValue={changeValue}
                    testID="input"
                    floatingPoint={false}
                />,
                { wrapper: TestingProvider }
            );

            fireEvent.changeText(screen.getByTestId("input"), `${input}`);
            expect(changeValue).toHaveBeenCalledWith(expected);
        }
    );
    test.each([
        [12.3, 12.3],
        [542.34, 542.34],
        ["Here I Am 4 you", 4],
    ])(
        "should read floating point numbers and ignore any extrainious letters in %f",
        (input, expected) => {
            const changeValue = jest.fn();
            render(
                <NumberInput
                    value={0}
                    onChangeValue={changeValue}
                    testID="input"
                    floatingPoint={true}
                />,
                { wrapper: TestingProvider }
            );

            fireEvent.changeText(screen.getByTestId("input"), `${input}`);
            expect(changeValue).toHaveBeenCalledWith(expected);
        }
    );

    test("Correctly handles icon replacement", () => {
        const changeValue = jest.fn();
        render(
            <NumberInput
                value={0}
                onChangeValue={changeValue}
                testID="input"
                floatingPoint={true}
                plusIcon="TestPlus"
                minusIcon="TestMinus"
            />,
            { wrapper: TestingProvider }
        );

        expect(screen.getByTestId("increment-button")).toHaveProp(
            "icon",
            "TestPlus"
        );
        expect(screen.getByTestId("decrement-button")).toHaveProp(
            "icon",
            "TestMinus"
        );
    });
});
