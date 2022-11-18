/**
 * The Home Screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { t } from "@lingui/macro";
import { user, useDispatch } from "@ridesaver/store";
import {
    LocationSelector,
    NumberInput,
    RideEstimate,
} from "@ridesaver/components";
import type { Estimate } from "@RideSaver/api";

export default () => {
    const dispatch = useDispatch();

    const [startPoint, setStartPoint] = useState(undefined);
    const [endPoint, setEndPoint] = useState(undefined);
    const [riders, setRiders] = useState(1);
    const estimates: Estimate[] = [];

    useCallback(() => {
        dispatch(user.load());
    }, []);

    return (
        <View>
            <LocationSelector onUpdateLocation={setStartPoint} />
            <LocationSelector onUpdateLocation={setEndPoint} />
            <NumberInput
                value={riders}
                onChangeValue={setRiders}
                label={t`Riders`}
            />
            {estimates.map((estimate) => (
                <RideEstimate estimate={estimate} key={estimate.id} />
            ))}
        </View>
    );
};
