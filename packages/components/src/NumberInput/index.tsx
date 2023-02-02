/**
 * TextInput that validates numbers, as well as having increment and decrement buttons.
 * @author Elias Schablowski
 * @format
 */

import React from "react";
import { Platform } from "react-native";
import { Input, IInputProps, Pressable, Icon } from "native-base";
// import { MaterialIcons } from "react-native-vector-icons";

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
} & Omit<Partial<IInputProps>, "value">) => {
    return (
        <Input
            InputLeftElement={
                <Pressable onPress={() => onChangeValue(value - 1)}>
                    <Icon
                        name={minusIcon}
                        size={5}
                        mr="2"
                        color="muted.900"
                    />
                </Pressable>
            }
            InputRightElement={
                <Pressable onPress={() => onChangeValue(value + 1)}>
                    <Icon
                        name={plusIcon}
                        size={5}
                        mr="2"
                        color="muted.900"
                    />
                </Pressable>
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
