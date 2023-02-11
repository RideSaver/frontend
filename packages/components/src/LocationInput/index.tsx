/**
 * TextInput with specializations for location input.
 * @author Elias Schablowski
 * @format
 */

import React, { useEffect, useState } from "react";
import {
    Input,
    IInputProps,
    FormControl,
    useDisclose,
    Select,
    Icon,
    Pressable,
} from "native-base";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import useDebounce from "../utils/useDebounce";
import useGeoCode, { useReverseGeoCode } from "./geoCode";
import getCurrentLocation, { getCurrentLocationFast } from "./currentLocation";
import { propsFlattener } from "native-base/lib/typescript/hooks/useThemeProps/propsFlattener";

export type location = {
    latitude: number;
    longitude: number;
};

interface Props extends Partial<IInputProps> {
    location?: location;
    onUpdateLocation: (location: location) => void;
    startWithCurrentLocation?: boolean;
}

export default (options: Props) => {
    const { i18n } = useLingui();

    const [location, setLocation] = useState<string>(
        useReverseGeoCode(options.location).address
    );
    const [currentLocationActive, setCurrentLocationActive] = useState(
        !!options.startWithCurrentLocation
    );
    const [selectedOption, setSelectedOption] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclose(false);
    const debouncedLocation = useDebounce(location, 500);

    const { error, locations } = useGeoCode(debouncedLocation);

    useEffect(() => {
        options.startWithCurrentLocation &&
            !options.location &&
            getCurrentLocationFast()
                .then(options.onUpdateLocation)
                .finally(() =>
                    getCurrentLocation().then(options.onUpdateLocation)
                );
    }, []);

    return (
        <FormControl isInvalid={!!error}>
            <Input
                onChangeText={(text) => {
                    if (currentLocationActive) {
                        setLocation("");
                        setCurrentLocationActive(false);
                    }
                    setLocation(text);
                }}
                value={
                    currentLocationActive ? t(i18n)`Current Location` : location
                }
                {...options}
                onBlur={(e) => {
                    console.log(locations);
                    options.onUpdateLocation(locations[selectedOption]);
                    // onClose();
                    if (typeof options.onBlur == "function") options.onBlur(e);
                }}
                onFocus={(e) => {
                    // onOpen();
                    if (typeof options.onFocus == "function")
                        options.onFocus(e);
                }}
                InputRightElement={
                    <Pressable
                        onPress={() => {
                            setCurrentLocationActive(!currentLocationActive);
                            if (currentLocationActive) {
                                getCurrentLocation().then((loc) => {
                                    console.log(loc);
                                    options.onUpdateLocation(loc);
                                });
                            }
                        }}
                    >
                        <Icon
                            name={
                                currentLocationActive
                                    ? "crosshairs-off"
                                    : "crosshairs-gps"
                            }
                        />
                    </Pressable>
                }
            />
            {isOpen ? (
                <Select
                    onValueChange={(value) =>
                        setSelectedOption(parseInt(value))
                    }
                >
                    {locations.map((location, index) => (
                        <Select.Item
                            label={location.name}
                            value={index.toString()}
                        />
                    ))}
                </Select>
            ) : undefined}
            <FormControl.ErrorMessage testID="location-error-message">
                <Trans>An error occured during geocoding</Trans>
            </FormControl.ErrorMessage>
        </FormControl>
    );
};
