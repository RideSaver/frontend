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

import LocationSelector from "..";

import i18n from "@ridesaver/internationalization";
import { I18nProvider } from "@lingui/react";

const TestingProvider = ({ children }) => (
    <I18nProvider i18n={i18n} defaultComponent={Text}>
        {children}
    </I18nProvider>
);

describe("Location Selector", () => {
    test.each([
        {
            str: "12.37N123.5W",
            lat: 12.37,
            long: -123.5,
        },
        {
            str: "156.324S123.5W",
            lat: -156.324,
            long: -123.5,
        },
        {
            str: "16N52.8E",
            lat: 16,
            long: 52.8,
        },
    ])("should output the correct location for $str", ({ str, lat, long }) => {
        const updateLocation = jest.fn();
        render(
            <LocationSelector
                onUpdateLocation={updateLocation}
                testID="input"
            />,
            { wrapper: TestingProvider }
        );

        fireEvent.changeText(screen.getByTestId("input"), str);
        expect(updateLocation).toHaveBeenCalledWith({
            latitude: lat,
            longitude: long,
        });
    });

    test.each(["Invalid String", "132N", "32", "43W432.43N"])(
        "Should print error message for %s",
        (invalidString) => {
            const updateLocation = jest.fn();
            render(
                <LocationSelector
                    onUpdateLocation={updateLocation}
                    testID="input"
                />,
                { wrapper: TestingProvider }
            );

            fireEvent.changeText(screen.getByTestId("input"), invalidString);
            expect(updateLocation).not.toHaveBeenCalled();
            expect(screen.getByTestId("location-error-message")).not.toBeEmptyElement();
        }
    );

    test.each([
        {
            str: "12.37N123.5W",
            lat: 12.37,
            long: -123.5,
        },
        {
            str: "156.324S123.5W",
            lat: -156.324,
            long: -123.5,
        },
        {
            str: "16N52.8E",
            lat: 16,
            long: 52.8,
        },
    ])("Correctly starts the input with $str", ({ str, lat, long }) => {
        render(
            <LocationSelector
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onUpdateLocation={() => {}}
                testID="input"
                location={{
                    latitude: lat,
                    longitude: long,
                }}
            />,
            { wrapper: TestingProvider }
        );
        expect(screen.getByTestId("input")).toHaveProp("value", str);
    });
});
