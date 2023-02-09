/**
 * TextInput with specializations for location input.
 * @author Elias Schablowski
 * @format
 */

import React, { useEffect, useState } from "react";
import { Input, IInputProps, FormControl, Text } from "native-base";
import { Trans } from "@lingui/macro";
import geoCode from "./geoCode";
import useDebounce from "../utils/useDebounce";

export type location = {
    latitude: number;
    longitude: number;
};

interface Props extends Partial<IInputProps> {
    location?: location;
    onUpdateLocation: (location: location) => void;
}

export default (options: Props) => {
    const [location, setLocation] = useState("");
    const [error, setError] = useState<boolean>(false);
    const debouncedLocation = useDebounce(location, 500);

    useEffect(() => {
        geoCode(debouncedLocation)
            .then(({ latitude, longitude }) => {
                options.onUpdateLocation({
                    latitude,
                    longitude,
                });
                setError(false);
            })
            .catch(() => setError(true));
    }, [debouncedLocation]);

    return (
        <FormControl isInvalid={error}>
            <Input onChangeText={setLocation} value={location} {...options} />
            <FormControl.ErrorMessage testID="location-error-message">
                <Trans>An error occured during geocoding</Trans>
            </FormControl.ErrorMessage>
        </FormControl>
    );
};
