/**
 * TextInput with specializations for location input.
 * @author Elias Schablowski
 * @format
 */

import React, { useState } from "react";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";
import { Text, View, StyleSheet } from "react-native";
import { Trans } from "@lingui/macro";

export type location = {
    latitude: number;
    longitude: number;
};

interface Props extends Partial<TextInputProps> {
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
        <View>
            <TextInput
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
                    } else {
                        setError(true);
                    }
                }}
                value={location}
                {...options}
            />
            <HelperText
                type="error"
                visible={error !== undefined}
                testID="location-error-message"
            >
                <Trans>
                    Expected format is{" "}
                    <Text style={styles.helperTextExtraEmphasis}>
                        35.67N132.342W
                    </Text>
                </Trans>
            </HelperText>
        </View>
    );
};

const styles = StyleSheet.create({
    helperTextExtraEmphasis: {
        fontWeight: "bold",
    },
});
