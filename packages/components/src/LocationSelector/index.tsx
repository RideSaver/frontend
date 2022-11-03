import React, { useCallback, useState } from "react";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";
import { Text, View, StyleSheet } from "react-native";
import { Trans } from "@lingui/macro";

type location = {
    latitude: number;
    longitude: number;
};

interface Props extends Partial<TextInputProps> {
    location?: location;
    onUpdateLocation: (location: location) => void;
}

export default (options: Props) => {
    const [location, setLocation] = useState("");
    useCallback(
        () =>
            options.location &&
            setLocation(
                `${Math.abs(options.location.longitude)}${
                    options.location.longitude > 0 ? "N" : "S"
                }${Math.abs(options.location.latitude)}${
                    options.location.latitude > 0 ? "E" : "W"
                }`
            ),
        [options.location]
    );
    const [error, setError] = useState<React.ReactElement>();
    return (
        <View>
            <TextInput
                onChangeText={(text: string) => {
                    setLocation(text);
                    const matches =
                        /^(?<longitude>\d{1,3}(\.\d+)(N|S))(?<latitude>\d{1,3}(\.\d+)(E|W))$/.exec(
                            text
                        );
                    if (
                        "latitude" in matches.groups &&
                        "longitude" in matches.groups
                    ) {
                        options.onUpdateLocation({
                            latitude: parseFloat(matches.groups.latitude),
                            longitude: parseFloat(matches.groups.longitude),
                        });
                        matches.groups.latitude;
                    } else {
                        setError(() => (
                            <Trans>
                                Expected format is{" "}
                                <Text style={styles.helperTextExtraEmphasis}>
                                    {(Math.random() * 180).toFixed(
                                        Math.random() * 4
                                    )}
                                    {Math.random() > 0.5 ? "N" : "S"}
                                    {(Math.random() * 180).toFixed(
                                        Math.random() * 4
                                    )}
                                    {Math.random() > 0.5 ? "E" : "W"}
                                </Text>
                            </Trans>
                        ));
                    }
                }}
                value={location}
                {...options}
            />
            <HelperText type="error" visible={error !== undefined}>
                {error}
            </HelperText>
        </View>
    );
};

const styles = StyleSheet.create({
    helperTextExtraEmphasis: {
        fontWeight: "bold",
    },
});
