/**
 * TextInput that validates numbers, as well as having increment and decrement buttons.
 * @author Elias Schablowski
 * @format
 */

import React from "react";
import { Platform } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

export default ({
    value,
    onChangeValue,
    plusIcon = "plus",
    minusIcon = "minus",
    floatingPoint = false,
    ...textInputOptions
}: {
    value: number;
    onChangeValue: (value: number) => void;
    plusIcon?: string;
    minusIcon?: string;
    floatingPoint?: boolean;
} & Omit<Partial<TextInputProps>, "value">) => {
    return (
        <TextInput
            mode="outlined"
            left={
                <TextInput.Icon
                    icon={minusIcon}
                    onPress={() => onChangeValue(value - 1)}
                    testID="decrement-button"
                />
            }
            right={
                <TextInput.Icon
                    icon={plusIcon}
                    onPress={() => onChangeValue(value + 1)}
                    testID="increment-button"
                />
            }
            value={`${value}`}
            onChangeText={(text) => {
                const filtered = text.replaceAll(/[^\d.]/g, "");
                const val = floatingPoint
                    ? parseFloat(filtered)
                    : parseInt(filtered, 10);
                onChangeValue(val);
            }}
            keyboardType={
                !floatingPoint && Platform.OS == "ios"
                    ? "numeric"
                    : "decimal-pad"
            }
            {...textInputOptions}
        />
    );
};
