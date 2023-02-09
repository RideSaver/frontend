/**
 * The Home Screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useState } from "react";
import { View, ScrollView } from "native-base";
import {
    ServiceMap,
    TopDrawer,
    BottomDrawer,
    LocationInput,
} from "@RideSaver/components";
import { useGetEstimatesQuery } from "@RideSaver/api/redux";
import type { location } from "@RideSaver/components/src/LocationInput";

import RideEstimate from "./Estimate";
import { NumberInput } from "@RideSaver/components";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";

import useCurrentLocation from "./currentLocation";

export default function Estimates() {
    const [startPoint, setStartPoint] = useState<location>({
        latitude: 0,
        longitude: 0,
    });
    useCurrentLocation(setStartPoint);
    const [endPoint, setEndPoint] = useState<location>({
        latitude: 0,
        longitude: 0,
    });
    const [riders, setRiders] = useState(1);
    const { i18n } = useLingui();

    const estimates =
        useGetEstimatesQuery(
            {
                startPoint: {
                    latitude: startPoint.latitude,
                    longitude: startPoint.longitude,
                },
                endPoint: {
                    latitude: endPoint.latitude,
                    longitude: endPoint.longitude,
                },
                seats: riders,
            },
            { skip: !startPoint || !endPoint }
        ).data || [];

    return (
        <View display="flex" flex="1">
            <TopDrawer>
                <LocationInput
                    onUpdateLocation={setStartPoint}
                    placeholder={t(i18n)`Start Point`}
                />
                <LocationInput
                    onUpdateLocation={setEndPoint}
                    placeholder={t(i18n)`Destination`}
                />
                <NumberInput
                    value={riders}
                    onChangeValue={setRiders}
                    placeholder={t(i18n)`Riders`}
                />
            </TopDrawer>
            <View width="full" height="full">
                <ServiceMap>
                    <ServiceMap.Route waypoints={[startPoint, endPoint]} />
                </ServiceMap>
            </View>
            <BottomDrawer>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    {estimates.map((estimate) => (
                        <RideEstimate estimate={estimate} />
                    ))}
                </ScrollView>
            </BottomDrawer>
        </View>
    );
}
