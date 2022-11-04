import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-paper";

import { rideSettings } from "@ridesaver/store";

export default () => {
    const dispatch = useDispatch();
    const seatsDispatch = useCallback(
        (seats: number) => dispatch(rideSettings.setSeats(seats)),
        []
    );
    const seats = useSelector(rideSettings.getSeats);
    return (
        <TextInput
                mode="outlined"
                label="Riders"
                left={
                    <TextInput.Icon
                        icon="account-multiple-minus"
                        onPress={() => seatsDispatch(seats - 1)}
                    />
                }
                right={
                    <TextInput.Icon
                        icon="account-multiple-plus"
                        onPress={() => seatsDispatch(seats + 1)}
                    />
                }
                value={`${seats}`}
                onTextInput={({ nativeEvent: text }) =>
                    seatsDispatch(parseInt(text.text))
                }
            />
    );
};
