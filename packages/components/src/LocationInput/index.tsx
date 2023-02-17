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
    QuestionIcon,
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

    const [currentLocation, setCurrentLocation] = useState(undefined);

    const [selectedOption, setSelectedOption] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclose(false);
    const debouncedLocation = useDebounce(location, 500);

    const { error, locations } = useGeoCode(debouncedLocation, currentLocation);

    useEffect(() => {
        async () => {
            let currLoc = await getCurrentLocationFast();
            setCurrentLocation(currLoc);
            if (options.startWithCurrentLocation && !options.location)
                options.onUpdateLocation(currLoc);
            currLoc = await getCurrentLocation();
            setCurrentLocation(currLoc);
            if (options.startWithCurrentLocation && !options.location)
                options.onUpdateLocation(currLoc);
        };
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
                margin={3} marginTop={1}
                _light={{
                   _input:{
                    color: "coolGray.200"
                   }
                }}
                _dark={{
                    _input:{
                     color: "coolGray.200"
                    }
                 }}
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
                InputLeftElement={<QuestionIcon name="question" marginLeft="2" color="light.200"/>}
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
                <Trans>An error occurred during geocoding</Trans>
            </FormControl.ErrorMessage>
        </FormControl>
    );
};
