/**
 * TextInput that validates numbers, as well as having increment and decrement buttons.
 * @author Elias Schablowski
 * @format
 */

import React from 'react';
import { LayoutAnimation, Platform } from "react-native";
import { Input, IInputProps, Pressable, Icon } from "native-base";
import { ScaleControl } from 'mapbox-gl';
import { useIsPressed } from 'native-base/lib/typescript/components/primitives';
import { background } from 'native-base/lib/typescript/theme/styled-system';
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
            variant="unstyled"
            textAlign="center"
            alignSelf="center"
            width="150px" height="3vh"
            rounded="sm"
            _input={{   
                fontSize:"md",
                borderWidth:"1",
                borderRadius:"lg",
                borderColor:"coolGray.400",
                color:"coolGray.100",
                fontStyle:"Roboto",
                fontWeight:"semibold",
                ml:"3", mr:"3"
            }}
            InputLeftElement={
                <Pressable onPress={() => {
                    onChangeValue(value - 1)
                    }}>
                    <Icon
                        rounded="sm"
                        name={minusIcon}
                        size={6}
                        ml="1"
                        color="coolGray.100"
                        shadow="2"
                    />
                </Pressable>
            }
            InputRightElement={
                <Pressable onPress={() => onChangeValue(value + 1)}>
                    <Icon
                        strokeWidth={10}
                        name={plusIcon}
                        size={6}
                        mr="3"
                        rounded="sm"
                        shadow="2"
                        color="coolGray.100"
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

