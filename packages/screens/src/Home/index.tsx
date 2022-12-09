/**
 * The Home Screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { t } from "@lingui/macro";
import { user, useDispatch } from "@RideSaver/store";
import {
    LocationSelector,
    NumberInput,
    RideEstimate,
} from "@RideSaver/components";
import { useGetEstimatesQuery } from "@RideSaver/api/redux";

import type { location } from "@RideSaver/components/src/LocationSelector";

export default () => {
    const dispatch = useDispatch();

    const [startPoint, setStartPoint] = useState<location>(undefined);
    const [endPoint, setEndPoint] = useState<location>(undefined);
    const [riders, setRiders] = useState(1);
    const estimates =
        startPoint && endPoint
            ? useGetEstimatesQuery({
                  startPoint: {
                      latitude: startPoint.latitude,
                      longitude: startPoint.longitude,
                  },
                  endPoint: {
                      latitude: endPoint.latitude,
                      longitude: endPoint.longitude,
                  },
              }).data
            : [];

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
