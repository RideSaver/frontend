import React, { useCallback } from "react";
import { TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { rideSettings } from "@ride-saver/store";

export default ({location}: {location: "endPoint" | "startPoint"}) => {
    const dispatch = useDispatch();

    const normalizedLocation: Capitalize<typeof location> = location.charAt(0).toUpperCase() + location.substring(1) as any;

    const locationState = useSelector(rideSettings["set"+normalizedLocation]) as {
        latitude: number;
        longitude: number;
    };
    const latitudeDispatch = useCallback(
        (latitude: number) => dispatch(rideSettings["set"+normalizedLocation]({
            ...locationState,
            latitude
        })),
        []
    );
    const longitudeDispatch = useCallback(
        (longitude: number) => dispatch(rideSettings["set"+normalizedLocation]({
            ...locationState,
            longitude
        })),
        []
    );
    return (
        <View>
            <TextInput
                onChange={(event) => latitudeDispatch(parseInt("0"+event.nativeEvent.text))}
                value={locationState.latitude + ""}
            />
            <TextInput
                onChange={(event) => longitudeDispatch(parseInt("0"+event.nativeEvent.text))}
                value={locationState.longitude + ""}
            />
        </View>
    );
};
