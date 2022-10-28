import React, { useCallback } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NumericInput from "react-native-numeric-input";

import { rideSettings } from "@ridesaver/store";

export default () => {
    const dispatch = useDispatch();
    const seatsDispatch = useCallback(
        (seats: number) => dispatch(rideSettings.setSeats(seats)),
        []
    );
    const seats = useSelector(rideSettings.getSeats);
    return (
        <View>
            <NumericInput
                onChange={(seats) => seatsDispatch(seats)}
                value={seats}
                minValue={0}
            />
        </View>
    );
};
