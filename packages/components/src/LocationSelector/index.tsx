/**
 * TextInput with specializations for location input.
 * @author Elias Schablowski
 * @format
 */

import React, { useState } from "react";
import { Input, IInputProps, FormControl, Text } from "native-base";
import { Trans } from "@lingui/macro";

export type location = {
    latitude: number;
    longitude: number;
};

interface Props extends Partial<IInputProps> {
    location?: location;
    onUpdateLocation: (location: location) => void;
}

export default (options: Props) => {
    const [location, setLocation] = useState(
        (options.location &&
            `${Math.abs(options.location.latitude)}${
                options.location.latitude > 0 ? "N" : "S"
            }${Math.abs(options.location.longitude)}${
                options.location.longitude > 0 ? "E" : "W"
            }`) ||
            ""
    );
    const [error, setError] = useState<boolean>(false);
    return (
        <FormControl isInvalid={error}>
            <Input
                onChangeText={(text: string) => {
                    /**
                     * @TODO Cleanup the coordinate parsing logic, it is rather ugly
                     */
                    setLocation(text);
                    // Parse each part of the coordinate
                    const matches =
                        /^(?<latitude>\d{1,3}(\.\d+)?(N|S))(?<longitude>\d{1,3}(\.\d+)?(E|W))$/i.exec(
                            text
                        );

                    // Did we match the regex?
                    if (
                        matches &&
                        "latitude" in matches.groups &&
                        "longitude" in matches.groups
                    ) {
                        // Normalize the capitalization
                        const lat: string =
                            matches.groups.latitude.toUpperCase();
                        const long: string =
                            matches.groups.longitude.toUpperCase();
                        options.onUpdateLocation({
                            latitude:
                                parseFloat(lat) * (lat.includes("N") ? 1 : -1),
                            longitude:
                                parseFloat(long) *
                                (long.includes("E") ? 1 : -1),
                        });
                        setError(false);
                    } else {
                        setError(true);
                    }
                }}
                value={location}
                {...options}
            />
            <FormControl.ErrorMessage testID="location-error-message">
                <Trans>
                    Expected format is <Text bold>35.67N132.342W</Text>
                </Trans>
            </FormControl.ErrorMessage>
        </FormControl>
    );
};
